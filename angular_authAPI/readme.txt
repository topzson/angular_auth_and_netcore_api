Create web APIs with ASP.NET Core
Article
04/11/2023
15 contributors
In this article
ControllerBase class
Attributes
ApiController attribute
Attribute routing requirement
Show 6 more
ASP.NET Core supports creating web APIs using controllers or using minimal APIs. Controllers in a web API are classes that derive from ControllerBase. Controllers are activated and disposed on a per request basis.

This article shows how to use controllers for handling web API requests. For information on creating web APIs without controllers, see Tutorial: Create a minimal API with ASP.NET Core.

ControllerBase class
A controller-based web API consists of one or more controller classes that derive from ControllerBase. The web API project template provides a starter controller:

C#

Copy
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
Web API controllers should typically derive from ControllerBase rather from Controller. Controller derives from ControllerBase and adds support for views, so it's for handling web pages, not web API requests. If the same controller must support views and web APIs, derive from Controller.

The ControllerBase class provides many properties and methods that are useful for handling HTTP requests. For example, CreatedAtAction returns a 201 status code:

C#

Copy
[HttpPost]
[ProducesResponseType(StatusCodes.Status201Created)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
public ActionResult<Pet> Create(Pet pet)
{
    pet.Id = _petsInMemoryStore.Any() ? 
             _petsInMemoryStore.Max(p => p.Id) + 1 : 1;
    _petsInMemoryStore.Add(pet);

    return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
}
The following table contains examples of methods in ControllerBase.

Method	Notes
BadRequest	Returns 400 status code.
NotFound	Returns 404 status code.
PhysicalFile	Returns a file.
TryUpdateModelAsync	Invokes model binding.
TryValidateModel	Invokes model validation.
For a list of all available methods and properties, see ControllerBase.

Attributes
The Microsoft.AspNetCore.Mvc namespace provides attributes that can be used to configure the behavior of web API controllers and action methods. The following example uses attributes to specify the supported HTTP action verb and any known HTTP status codes that could be returned:

C#

Copy
[HttpPost]
[ProducesResponseType(StatusCodes.Status201Created)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
public ActionResult<Pet> Create(Pet pet)
{
    pet.Id = _petsInMemoryStore.Any() ? 
             _petsInMemoryStore.Max(p => p.Id) + 1 : 1;
    _petsInMemoryStore.Add(pet);

    return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
}
Here are some more examples of attributes that are available.

Attribute	Notes
[Route]	Specifies URL pattern for a controller or action.
[Bind]	Specifies prefix and properties to include for model binding.
[HttpGet]	Identifies an action that supports the HTTP GET action verb.
[Consumes]	Specifies data types that an action accepts.
[Produces]	Specifies data types that an action returns.
For a list that includes the available attributes, see the Microsoft.AspNetCore.Mvc namespace.

ApiController attribute
The [ApiController] attribute can be applied to a controller class to enable the following opinionated, API-specific behaviors:

Attribute routing requirement
Automatic HTTP 400 responses
Binding source parameter inference
Multipart/form-data request inference
Problem details for error status codes
Attribute on specific controllers
The [ApiController] attribute can be applied to specific controllers, as in the following example from the project template:

C#

Copy
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
Attribute on multiple controllers
One approach to using the attribute on more than one controller is to create a custom base controller class annotated with the [ApiController] attribute. The following example shows a custom base class and a controller that derives from it:

C#

Copy
[ApiController]
public class MyControllerBase : ControllerBase
{
}
C#

Copy
[Produces(MediaTypeNames.Application.Json)]
[Route("[controller]")]
public class PetsController : MyControllerBase
Attribute on an assembly
The [ApiController] attribute can be applied to an assembly. When the [ApiController] attribute is applied to an assembly, all controllers in the assembly have the [ApiController] attribute applied. There's no way to opt out for individual controllers. Apply the assembly-level attribute to the Program.cs file:

C#

Copy
using Microsoft.AspNetCore.Mvc;
[assembly: ApiController]

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
Attribute routing requirement
The [ApiController] attribute makes attribute routing a requirement. For example:

C#

Copy
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
Actions are inaccessible via conventional routes defined by UseEndpoints, UseMvc, or UseMvcWithDefaultRoute.

Automatic HTTP 400 responses
The [ApiController] attribute makes model validation errors automatically trigger an HTTP 400 response. Consequently, the following code is unnecessary in an action method:

C#

Copy
if (!ModelState.IsValid)
{
    return BadRequest(ModelState);
}
ASP.NET Core MVC uses the ModelStateInvalidFilter action filter to do the preceding check.

Default BadRequest response
The default response type for an HTTP 400 response is ValidationProblemDetails. The following response body is an example of the serialized type:

JSON

Copy
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "|7fb5e16a-4c8f23bbfc974667.",
  "errors": {
    "": [
      "A non-empty request body is required."
    ]
  }
}
The ValidationProblemDetails type:

Provides a machine-readable format for specifying errors in web API responses.
Complies with the RFC 7807 specification.
To make automatic and custom responses consistent, call the ValidationProblem method instead of BadRequest. ValidationProblem returns a ValidationProblemDetails object as well as the automatic response.

Log automatic 400 responses
To log automatic 400 responses, set the InvalidModelStateResponseFactory delegate property to perform custom processing. By default, InvalidModelStateResponseFactory uses ProblemDetailsFactory to create an instance of ValidationProblemDetails.

The following example shows how to retrieve an instance of ILogger<TCategoryName> to log information about an automatic 400 response:

C#

Copy
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
      // To preserve the default behavior, capture the original delegate to call later.
        var builtInFactory = options.InvalidModelStateResponseFactory;

        options.InvalidModelStateResponseFactory = context =>
        {
            var logger = context.HttpContext.RequestServices
                                .GetRequiredService<ILogger<Program>>();

            // Perform logging here.
            // ...

            // Invoke the default behavior, which produces a ValidationProblemDetails
            // response.
            // To produce a custom response, return a different implementation of 
            // IActionResult instead.
            return builtInFactory(context);
        };
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
Disable automatic 400 response
To disable the automatic 400 behavior, set the SuppressModelStateInvalidFilter property to true. Add the following highlighted code:

C#

Copy
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressConsumesConstraintForFormFileParameters = true;
        options.SuppressInferBindingSourcesForParameters = true;
        options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            "https://httpstatuses.com/404";
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
Binding source parameter inference
A binding source attribute defines the location at which an action parameter's value is found. The following binding source attributes exist:

Attribute	Binding source
[FromBody]	Request body
[FromForm]	Form data in the request body
[FromHeader]	Request header
[FromQuery]	Request query string parameter
[FromRoute]	Route data from the current request
[FromServices]	The request service injected as an action parameter
[AsParameters]	Method parameters
 Warning

Don't use [FromRoute] when values might contain %2f (that is /). %2f won't be unescaped to /. Use [FromQuery] if the value might contain %2f.

Without the [ApiController] attribute or binding source attributes like [FromQuery], the ASP.NET Core runtime attempts to use the complex object model binder. The complex object model binder pulls data from value providers in a defined order.

In the following example, the [FromQuery] attribute indicates that the discontinuedOnly parameter value is provided in the request URL's query string:

C#

Copy
[HttpGet]
public ActionResult<List<Product>> Get(
    [FromQuery] bool discontinuedOnly = false)
{
    List<Product> products = null;

    if (discontinuedOnly)
    {
        products = _productsInMemoryStore.Where(p => p.IsDiscontinued).ToList();
    }
    else
    {
        products = _productsInMemoryStore;
    }

    return products;
}
The [ApiController] attribute applies inference rules for the default data sources of action parameters. These rules save you from having to identify binding sources manually by applying attributes to the action parameters. The binding source inference rules behave as follows:

[FromServices] is inferred for complex type parameters registered in the DI Container.
[FromBody] is inferred for complex type parameters not registered in the DI Container. An exception to the [FromBody] inference rule is any complex, built-in type with a special meaning, such as IFormCollection and CancellationToken. The binding source inference code ignores those special types.
[FromForm] is inferred for action parameters of type IFormFile and IFormFileCollection. It's not inferred for any simple or user-defined types.
[FromRoute] is inferred for any action parameter name matching a parameter in the route template. When more than one route matches an action parameter, any route value is considered [FromRoute].
[FromQuery] is inferred for any other action parameters.
FromBody inference notes
[FromBody] isn't inferred for simple types such as string or int. Therefore, the [FromBody] attribute should be used for simple types when that functionality is needed.

When an action has more than one parameter bound from the request body, an exception is thrown. For example, all of the following action method signatures cause an exception:

[FromBody] inferred on both because they're complex types.

C#

Copy
[HttpPost]
public IActionResult Action1(Product product, Order order)
[FromBody] attribute on one, inferred on the other because it's a complex type.

C#

Copy
[HttpPost]
public IActionResult Action2(Product product, [FromBody] Order order)
[FromBody] attribute on both.

C#

Copy
[HttpPost]
public IActionResult Action3([FromBody] Product product, [FromBody] Order order)

FromServices inference notes
Parameter binding binds parameters through dependency injection when the type is configured as a service. This means it's not required to explicitly apply the [FromServices] attribute to a parameter. In the following code, both actions return the time:

C#

Copy
[Route("[controller]")]
[ApiController]
public class MyController : ControllerBase
{
    public ActionResult GetWithAttribute([FromServices] IDateTime dateTime) 
                                                        => Ok(dateTime.Now);

    [Route("noAttribute")]
    public ActionResult Get(IDateTime dateTime) => Ok(dateTime.Now);
}
In rare cases, automatic DI can break apps that have a type in DI that is also accepted in an API controller's action methods. It's not common to have a type in DI and as an argument in an API controller action.

To disable [FromServices] inference for a single action parameter, apply the desired binding source attribute to the parameter. For example, apply the [FromBody] attribute to an action parameter that should be bound from the body of the request.

To disable [FromServices] inference globally, set DisableImplicitFromServicesParameters to true:

C#

Copy
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton<IDateTime, SystemDateTime>();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.DisableImplicitFromServicesParameters = true;
});

var app = builder.Build();

app.MapControllers();

app.Run();
Types are checked at app startup with IServiceProviderIsService to determine if an argument in an API controller action comes from DI or from the other sources.

The mechanism to infer binding source of API Controller action parameters uses the following rules:

A previously specified BindingInfo.BindingSource is never overwritten.
A complex type parameter, registered in the DI container, is assigned BindingSource.Services.
A complex type parameter, not registered in the DI container, is assigned BindingSource.Body.
A parameter with a name that appears as a route value in any route template is assigned BindingSource.Path.
All other parameters are BindingSource.Query.
Disable inference rules
To disable binding source inference, set SuppressInferBindingSourcesForParameters to true:

C#

Copy
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressConsumesConstraintForFormFileParameters = true;
        options.SuppressInferBindingSourcesForParameters = true;
        options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            "https://httpstatuses.com/404";
        options.DisableImplicitFromServicesParameters = true;
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
Multipart/form-data request inference
The [ApiController] attribute applies an inference rule for action parameters of type IFormFile and IFormFileCollection. The multipart/form-data request content type is inferred for these types.

To disable the default behavior, set the SuppressConsumesConstraintForFormFileParameters property to true:

C#

Copy
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressConsumesConstraintForFormFileParameters = true;
        options.SuppressInferBindingSourcesForParameters = true;
        options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            "https://httpstatuses.com/404";
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
Problem details for error status codes
MVC transforms an error result (a result with status code 400 or higher) to a result with ProblemDetails. The ProblemDetails type is based on the RFC 7807 specification for providing machine-readable error details in an HTTP response.

Consider the following code in a controller action:

C#

Copy
if (pet == null)
{
    return NotFound();
}
The NotFound method produces an HTTP 404 status code with a ProblemDetails body. For example:

JSON

Copy
{
  type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  title: "Not Found",
  status: 404,
  traceId: "0HLHLV31KRN83:00000001"
}
Disable ProblemDetails response
The automatic creation of a ProblemDetails for error status codes is disabled when the SuppressMapClientErrors property is set to true. Add the following code:

C#

Copy
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressConsumesConstraintForFormFileParameters = true;
        options.SuppressInferBindingSourcesForParameters = true;
        options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            "https://httpstatuses.com/404";
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

Define supported request content types with the [Consumes] attribute
By default, an action supports all available request content types. For example, if an app is configured to support both JSON and XML input formatters, an action supports multiple content types, including application/json and application/xml.

The [Consumes] attribute allows an action to limit the supported request content types. Apply the [Consumes] attribute to an action or controller, specifying one or more content types:

C#

Copy
[HttpPost]
[Consumes("application/xml")]
public IActionResult CreateProduct(Product product)
In the preceding code, the CreateProduct action specifies the content type application/xml. Requests routed to this action must specify a Content-Type header of application/xml. Requests that don't specify a Content-Type header of application/xml result in a 415 Unsupported Media Type response.

The [Consumes] attribute also allows an action to influence its selection based on an incoming request's content type by applying a type constraint. Consider the following example:

C#

Copy
[ApiController]
[Route("api/[controller]")]
public class ConsumesController : ControllerBase
{
    [HttpPost]
    [Consumes("application/json")]
    public IActionResult PostJson(IEnumerable<int> values) =>
        Ok(new { Consumes = "application/json", Values = values });

    [HttpPost]
    [Consumes("application/x-www-form-urlencoded")]
    public IActionResult PostForm([FromForm] IEnumerable<int> values) =>
        Ok(new { Consumes = "application/x-www-form-urlencoded", Values = values });
}
In the preceding code, ConsumesController is configured to handle requests sent to the https://localhost:5001/api/Consumes URL. Both of the controller's actions, PostJson and PostForm, handle POST requests with the same URL. Without the [Consumes] attribute applying a type constraint, an ambiguous match exception is thrown.

The [Consumes] attribute is applied to both actions. The PostJson action handles requests sent with a Content-Type header of application/json. The PostForm action handles requests sent with a Content-Type header of application/x-www-form-urlencoded.
