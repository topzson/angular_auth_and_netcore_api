<div data-moniker="aspnetcore-7.0 aspnetcore-8.0">
<p>ASP.NET Core supports creating web APIs using controllers or using minimal APIs. <em>Controllers</em> in a web API are classes that derive from <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase" class="no-loc" data-linktype="absolute-path">ControllerBase</a>. Controllers are activated and disposed on a per request basis.</p>
<p>This article shows how to use controllers for handling web API requests. For information on creating web APIs without controllers, see <a href="https://learn.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-7.0" data-linktype="relative-path">Tutorial: Create a minimal API with ASP.NET Core</a>.</p>
<div class="heading-wrapper" data-heading-level="h2"><a class="anchor-link docon docon-link" href="#controllerbase-class" aria-label="Section titled: ControllerBase class"></a><h2 id="controllerbase-class" class="heading-anchor">ControllerBase class</h2></div>
<p>A controller-based web API consists of one or more controller classes that derive from <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase" class="no-loc" data-linktype="absolute-path">ControllerBase</a>. The web API project template provides a starter controller:</p>
<div class="codeHeader" id="code-try-0" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" highlight-lines="3" data-author-content="[ApiController]
[Route(&quot;[controller]&quot;)]
public class WeatherForecastController : ControllerBase
"><span>[<span class="hljs-meta">ApiController</span>]
[<span class="hljs-meta">Route(<span class="hljs-string">"[controller]"</span>)</span>]</span>
<mark><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">WeatherForecastController</span> : <span class="hljs-title">ControllerBase</span></mark>
<span></span></code></pre>
<p>Web API controllers should typically derive from <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase" class="no-loc" data-linktype="absolute-path">ControllerBase</a> rather from <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controller" class="no-loc" data-linktype="absolute-path">Controller</a>. <code>Controller</code> derives from <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase" class="no-loc" data-linktype="absolute-path">ControllerBase</a> and adds support for views, so it's for handling web pages, not web API requests. If the same controller must support views and web APIs, derive from <code>Controller</code>.</p>
<p>The <code>ControllerBase</code> class provides many properties and methods that are useful for handling HTTP requests. For example, <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase.createdataction" class="no-loc" data-linktype="absolute-path">CreatedAtAction</a> returns a 201 status code:</p>
<div class="codeHeader" id="code-try-1" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" highlight-lines="10" data-author-content="[HttpPost]
[ProducesResponseType(StatusCodes.Status201Created)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
public ActionResult<Pet> Create(Pet pet)
{
    pet.Id = _petsInMemoryStore.Any() ? 
             _petsInMemoryStore.Max(p => p.Id) + 1 : 1;
    _petsInMemoryStore.Add(pet);

    return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
}
"><span>[<span class="hljs-meta">HttpPost</span>]
[<span class="hljs-meta">ProducesResponseType(StatusCodes.Status201Created)</span>]
[<span class="hljs-meta">ProducesResponseType(StatusCodes.Status400BadRequest)</span>]
<span class="hljs-function"><span class="hljs-keyword">public</span> ActionResult&lt;Pet&gt; <span class="hljs-title">Create</span>(<span class="hljs-params">Pet pet</span>)</span>
{
    pet.Id = _petsInMemoryStore.Any() ? 
             _petsInMemoryStore.Max(p =&gt; p.Id) + <span class="hljs-number">1</span> : <span class="hljs-number">1</span>;
    _petsInMemoryStore.Add(pet);
</span>
<mark>    <span class="hljs-keyword">return</span> CreatedAtAction(<span class="hljs-keyword">nameof</span>(GetById), <span class="hljs-keyword">new</span> { id = pet.Id }, pet);</mark>
<span>}
</span></code></pre>
<p>The following table contains examples of methods in <code>ControllerBase</code>.</p>
<div class="has-inner-focus"><table aria-label="Table 1" class="table table-sm">
<thead>
<tr>
<th>Method</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase.badrequest" class="no-loc" data-linktype="absolute-path">BadRequest</a></td>
<td>Returns 400 status code.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase.notfound" class="no-loc" data-linktype="absolute-path">NotFound</a></td>
<td>Returns 404 status code.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase.physicalfile" class="no-loc" data-linktype="absolute-path">PhysicalFile</a></td>
<td>Returns a file.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase.tryupdatemodelasync" class="no-loc" data-linktype="absolute-path">TryUpdateModelAsync</a></td>
<td>Invokes <a href="https://learn.microsoft.com/en-us/aspnet/core/mvc/models/model-binding?view=aspnetcore-7.0" data-linktype="relative-path">model binding</a>.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase.tryvalidatemodel" class="no-loc" data-linktype="absolute-path">TryValidateModel</a></td>
<td>Invokes <a href="https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-7.0" data-linktype="relative-path">model validation</a>.</td>
</tr>
</tbody>
</table></div>
<p>For a list of all available methods and properties, see <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase" class="no-loc" data-linktype="absolute-path">ControllerBase</a>.</p>
<div class="heading-wrapper" data-heading-level="h2"><a class="anchor-link docon docon-link" href="#attributes" aria-label="Section titled: Attributes"></a><h2 id="attributes" class="heading-anchor">Attributes</h2></div>
<p>The <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc" class="no-loc" data-linktype="absolute-path">Microsoft.AspNetCore.Mvc</a> namespace provides attributes that can be used to configure the behavior of web API controllers and action methods. The following example uses attributes to specify the supported HTTP action verb and any known HTTP status codes that could be returned:</p>
<div class="codeHeader" id="code-try-2" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" highlight-lines="1-3" data-author-content="[HttpPost]
[ProducesResponseType(StatusCodes.Status201Created)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
public ActionResult<Pet> Create(Pet pet)
{
    pet.Id = _petsInMemoryStore.Any() ? 
             _petsInMemoryStore.Max(p => p.Id) + 1 : 1;
    _petsInMemoryStore.Add(pet);

    return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
}
"><mark>[<span class="hljs-meta">HttpPost</span>]
[<span class="hljs-meta">ProducesResponseType(StatusCodes.Status201Created)</span>]
[<span class="hljs-meta">ProducesResponseType(StatusCodes.Status400BadRequest)</span>]</mark>
<span><span class="hljs-function"><span class="hljs-keyword">public</span> ActionResult&lt;Pet&gt; <span class="hljs-title">Create</span>(<span class="hljs-params">Pet pet</span>)</span>
{
    pet.Id = _petsInMemoryStore.Any() ? 
             _petsInMemoryStore.Max(p =&gt; p.Id) + <span class="hljs-number">1</span> : <span class="hljs-number">1</span>;
    _petsInMemoryStore.Add(pet);

    <span class="hljs-keyword">return</span> CreatedAtAction(<span class="hljs-keyword">nameof</span>(GetById), <span class="hljs-keyword">new</span> { id = pet.Id }, pet);
}
</span></code></pre>
<p>Here are some more examples of attributes that are available.</p>
<div class="has-inner-focus"><table aria-label="Table 2" class="table table-sm">
<thead>
<tr>
<th>Attribute</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.routeattribute" data-linktype="absolute-path"><code>[Route]</code></a></td>
<td>Specifies URL pattern for a controller or action.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.bindattribute" data-linktype="absolute-path"><code>[Bind]</code></a></td>
<td>Specifies prefix and properties to include for model binding.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.httpgetattribute" data-linktype="absolute-path"><code>[HttpGet]</code></a></td>
<td>Identifies an action that supports the HTTP GET action verb.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.consumesattribute" data-linktype="absolute-path"><code>[Consumes]</code></a></td>
<td>Specifies data types that an action accepts.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.producesattribute" data-linktype="absolute-path"><code>[Produces]</code></a></td>
<td>Specifies data types that an action returns.</td>
</tr>
</tbody>
</table></div>
<p>For a list that includes the available attributes, see the <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc" class="no-loc" data-linktype="absolute-path">Microsoft.AspNetCore.Mvc</a> namespace.</p>
<div class="heading-wrapper" data-heading-level="h2"><a class="anchor-link docon docon-link" href="#apicontroller-attribute" aria-label="Section titled: ApiController attribute"></a><h2 id="apicontroller-attribute" class="heading-anchor">ApiController attribute</h2></div>
<p>The <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.apicontrollerattribute" data-linktype="absolute-path"><code>[ApiController]</code></a> attribute can be applied to a controller class to enable the following opinionated, API-specific behaviors:</p>
<ul>
<li><a href="#attribute-routing-requirement" data-linktype="self-bookmark">Attribute routing requirement</a></li>
<li><a href="#automatic-http-400-responses" data-linktype="self-bookmark">Automatic HTTP 400 responses</a></li>
<li><a href="#binding-source-parameter-inference" data-linktype="self-bookmark">Binding source parameter inference</a></li>
<li><a href="#multipartform-data-request-inference" data-linktype="self-bookmark">Multipart/form-data request inference</a></li>
<li><a href="#problem-details-for-error-status-codes" data-linktype="self-bookmark">Problem details for error status codes</a></li>
</ul>
<div class="heading-wrapper" data-heading-level="h3"><a class="anchor-link docon docon-link" href="#attribute-on-specific-controllers" aria-label="Section titled: Attribute on specific controllers"></a><h3 id="attribute-on-specific-controllers" class="heading-anchor">Attribute on specific controllers</h3></div>
<p>The <code>[ApiController]</code> attribute can be applied to specific controllers, as in the following example from the project template:</p>
<div class="codeHeader" id="code-try-3" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" data-author-content="[ApiController]
[Route(&quot;[controller]&quot;)]
public class WeatherForecastController : ControllerBase
"><span>[<span class="hljs-meta">ApiController</span>]
[<span class="hljs-meta">Route(<span class="hljs-string">"[controller]"</span>)</span>]
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">WeatherForecastController</span> : <span class="hljs-title">ControllerBase</span>
</span></code></pre><div class="heading-wrapper" data-heading-level="h3"><a class="anchor-link docon docon-link" href="#attribute-on-multiple-controllers" aria-label="Section titled: Attribute on multiple controllers"></a><h3 id="attribute-on-multiple-controllers" class="heading-anchor">Attribute on multiple controllers</h3></div>
<p>One approach to using the attribute on more than one controller is to create a custom base controller class annotated with the <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.apicontrollerattribute" data-linktype="absolute-path"><code>[ApiController]</code></a> attribute. The following example shows a custom base class and a controller that derives from it:</p>
<div class="codeHeader" id="code-try-4" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" data-author-content="[ApiController]
public class MyControllerBase : ControllerBase
{
}
"><span>[<span class="hljs-meta">ApiController</span>]
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">MyControllerBase</span> : <span class="hljs-title">ControllerBase</span>
{
}
</span></code></pre><div class="codeHeader" id="code-try-5" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" data-author-content="[Produces(MediaTypeNames.Application.Json)]
[Route(&quot;[controller]&quot;)]
public class PetsController : MyControllerBase
"><span>[<span class="hljs-meta">Produces(MediaTypeNames.Application.Json)</span>]
[<span class="hljs-meta">Route(<span class="hljs-string">"[controller]"</span>)</span>]
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">PetsController</span> : <span class="hljs-title">MyControllerBase</span>
</span></code></pre><div class="heading-wrapper" data-heading-level="h3"><a class="anchor-link docon docon-link" href="#attribute-on-an-assembly" aria-label="Section titled: Attribute on an assembly"></a><h3 id="attribute-on-an-assembly" class="heading-anchor">Attribute on an assembly</h3></div>
<p>The <code>[ApiController]</code> attribute can be applied to an assembly. When the <code>[ApiController]</code> attribute is applied to an assembly, all controllers in the assembly have the <code>[ApiController]</code> attribute applied. There's no way to opt out for individual controllers. Apply the assembly-level attribute to the <code>Program.cs</code> file:</p>
<div class="codeHeader" id="code-try-6" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" highlight-lines="1-3" data-author-content="using Microsoft.AspNetCore.Mvc;
[assembly: ApiController]

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
"><mark><span class="hljs-keyword">using</span> Microsoft.AspNetCore.Mvc;
[<span class="hljs-meta">assembly: ApiController</span>]
</mark>
<span><span class="hljs-keyword">var</span> builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

<span class="hljs-keyword">var</span> app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
</span></code></pre><div class="heading-wrapper" data-heading-level="h2"><a class="anchor-link docon docon-link" href="#attribute-routing-requirement" aria-label="Section titled: Attribute routing requirement"></a><h2 id="attribute-routing-requirement" class="heading-anchor">Attribute routing requirement</h2></div>
<p>The <code>[ApiController]</code> attribute makes attribute routing a requirement. For example:</p>
<div class="codeHeader" id="code-try-7" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" highlight-lines="2" data-author-content="[ApiController]
[Route(&quot;[controller]&quot;)]
public class WeatherForecastController : ControllerBase
"><span>[<span class="hljs-meta">ApiController</span>]</span>
<mark>[<span class="hljs-meta">Route(<span class="hljs-string">"[controller]"</span>)</span>]</mark>
<span><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">WeatherForecastController</span> : <span class="hljs-title">ControllerBase</span>
</span></code></pre>
<p>Actions are inaccessible via <a href="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing?view=aspnetcore-7.0#conventional-routing" data-linktype="relative-path">conventional routes</a> defined by <code>UseEndpoints</code>, <a href="/en-us/dotnet/api/microsoft.aspnetcore.builder.mvcapplicationbuilderextensions.usemvc" class="no-loc" data-linktype="absolute-path">UseMvc</a>, or <a href="/en-us/dotnet/api/microsoft.aspnetcore.builder.mvcapplicationbuilderextensions.usemvcwithdefaultroute" class="no-loc" data-linktype="absolute-path">UseMvcWithDefaultRoute</a>.</p>
<div class="heading-wrapper" data-heading-level="h2"><a class="anchor-link docon docon-link" href="#automatic-http-400-responses" aria-label="Section titled: Automatic HTTP 400 responses"></a><h2 id="automatic-http-400-responses" class="heading-anchor">Automatic HTTP 400 responses</h2></div>
<p>The <code>[ApiController]</code> attribute makes model validation errors automatically trigger an HTTP 400 response. Consequently, the following code is unnecessary in an action method:</p>
<div class="codeHeader" id="code-try-8" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" data-author-content="if (!ModelState.IsValid)
{
    return BadRequest(ModelState);
}
"><span><span class="hljs-keyword">if</span> (!ModelState.IsValid)
{
    <span class="hljs-keyword">return</span> BadRequest(ModelState);
}
</span></code></pre>
<p>ASP.NET Core MVC uses the <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.infrastructure.modelstateinvalidfilter" class="no-loc" data-linktype="absolute-path">ModelStateInvalidFilter</a> action filter to do the preceding check.</p>
<div class="heading-wrapper" data-heading-level="h3"><a class="anchor-link docon docon-link" href="#default-badrequest-response" aria-label="Section titled: Default BadRequest response"></a><h3 id="default-badrequest-response" class="heading-anchor">Default BadRequest response</h3></div>
<p>The default response type for an HTTP 400 response is <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.validationproblemdetails" class="no-loc" data-linktype="absolute-path">ValidationProblemDetails</a>. The following response body is an example of the serialized type:</p>
<div class="codeHeader" id="code-try-9" data-bi-name="code-header"><span class="language">JSON</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-json" data-author-content="{
  &quot;type&quot;: &quot;https://tools.ietf.org/html/rfc7231#section-6.5.1&quot;,
  &quot;title&quot;: &quot;One or more validation errors occurred.&quot;,
  &quot;status&quot;: 400,
  &quot;traceId&quot;: &quot;|7fb5e16a-4c8f23bbfc974667.&quot;,
  &quot;errors&quot;: {
    &quot;&quot;: [
      &quot;A non-empty request body is required.&quot;
    ]
  }
}
"><span>{
  <span class="hljs-attr">"type"</span>: <span class="hljs-string">"https://tools.ietf.org/html/rfc7231#section-6.5.1"</span>,
  <span class="hljs-attr">"title"</span>: <span class="hljs-string">"One or more validation errors occurred."</span>,
  <span class="hljs-attr">"status"</span>: <span class="hljs-number">400</span>,
  <span class="hljs-attr">"traceId"</span>: <span class="hljs-string">"|7fb5e16a-4c8f23bbfc974667."</span>,
  <span class="hljs-attr">"errors"</span>: {
    <span class="hljs-attr">""</span>: [
      <span class="hljs-string">"A non-empty request body is required."</span>
    ]
  }
}
</span></code></pre>
<p>The <code>ValidationProblemDetails</code> type:</p>
<ul>
<li>Provides a machine-readable format for specifying errors in web API responses.</li>
<li>Complies with the <a href="https://tools.ietf.org/html/rfc7807" data-linktype="external">RFC 7807 specification</a>.</li>
</ul>
<p>To make automatic and custom responses consistent, call the <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase.validationproblem" class="no-loc" data-linktype="absolute-path">ValidationProblem</a> method instead of <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase.badrequest" class="no-loc" data-linktype="absolute-path">BadRequest</a>. <code>ValidationProblem</code> returns a <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.validationproblemdetails" class="no-loc" data-linktype="absolute-path">ValidationProblemDetails</a> object as well as the automatic response.</p>
<div class="heading-wrapper" data-heading-level="h3"><a class="anchor-link docon docon-link" href="#log-automatic-400-responses" aria-label="Section titled: Log automatic 400 responses"></a><h3 id="log-automatic-400-responses" class="heading-anchor">Log automatic 400 responses</h3></div>
<p>To log automatic 400 responses, set the <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.apibehavioroptions.invalidmodelstateresponsefactory" class="no-loc" data-linktype="absolute-path">InvalidModelStateResponseFactory</a> delegate property to perform custom processing. By default, <code>InvalidModelStateResponseFactory</code> uses <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.infrastructure.problemdetailsfactory" class="no-loc" data-linktype="absolute-path">ProblemDetailsFactory</a> to create an instance of <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.validationproblemdetails" class="no-loc" data-linktype="absolute-path">ValidationProblemDetails</a>.</p>
<p>The following example shows how to retrieve an instance of <a href="/en-us/dotnet/api/microsoft.extensions.logging.ilogger-1" class="no-loc" data-linktype="absolute-path">ILogger&lt;TCategoryName&gt;</a> to log information about an automatic 400 response:</p>
<div class="codeHeader" id="code-try-10" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus" role="group" aria-label="Horizontally scrollable code" tabindex="0"><code class="lang-csharp" highlight-lines="3-23" data-author-content="var builder = WebApplication.CreateBuilder(args);

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
"><span><span class="hljs-keyword">var</span> builder = WebApplication.CreateBuilder(args);
</span>
<mark>builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =&gt;
    {
      <span class="hljs-comment">// To preserve the default behavior, capture the original delegate to call later.</span>
        <span class="hljs-keyword">var</span> builtInFactory = options.InvalidModelStateResponseFactory;

        options.InvalidModelStateResponseFactory = context =&gt;
        {
            <span class="hljs-keyword">var</span> logger = context.HttpContext.RequestServices
                                .GetRequiredService&lt;ILogger&lt;Program&gt;&gt;();

            <span class="hljs-comment">// Perform logging here.</span>
            <span class="hljs-comment">// ...</span>

            <span class="hljs-comment">// Invoke the default behavior, which produces a ValidationProblemDetails</span>
            <span class="hljs-comment">// response.</span>
            <span class="hljs-comment">// To produce a custom response, return a different implementation of </span>
            <span class="hljs-comment">// IActionResult instead.</span>
            <span class="hljs-keyword">return</span> builtInFactory(context);
        };
    });</mark>
<span>
<span class="hljs-keyword">var</span> app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
</span></code></pre><div class="heading-wrapper" data-heading-level="h3"><a class="anchor-link docon docon-link" href="#disable-automatic-400-response" aria-label="Section titled: Disable automatic 400 response"></a><h3 id="disable-automatic-400-response" class="heading-anchor">Disable automatic 400 response</h3></div>
<p>To disable the automatic 400 behavior, set the <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.apibehavioroptions.suppressmodelstateinvalidfilter#microsoft-aspnetcore-mvc-apibehavioroptions-suppressmodelstateinvalidfilter" class="no-loc" data-linktype="absolute-path">SuppressModelStateInvalidFilter</a> property to <code>true</code>. Add the following highlighted code:</p>
<div class="codeHeader" id="code-try-11" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" highlight-lines="10" data-author-content="using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressConsumesConstraintForFormFileParameters = true;
        options.SuppressInferBindingSourcesForParameters = true;
        options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            &quot;https://httpstatuses.com/404&quot;;
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
"><span><span class="hljs-keyword">using</span> Microsoft.AspNetCore.Mvc;

<span class="hljs-keyword">var</span> builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =&gt;
    {
        options.SuppressConsumesConstraintForFormFileParameters = <span class="hljs-literal">true</span>;
        options.SuppressInferBindingSourcesForParameters = <span class="hljs-literal">true</span>;</span>
<mark>        options.SuppressModelStateInvalidFilter = <span class="hljs-literal">true</span>;</mark>
<span>        options.SuppressMapClientErrors = <span class="hljs-literal">true</span>;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            <span class="hljs-string">"https://httpstatuses.com/404"</span>;
    });

<span class="hljs-keyword">var</span> app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
</span></code></pre><div class="heading-wrapper" data-heading-level="h2"><a class="anchor-link docon docon-link" href="#binding-source-parameter-inference" aria-label="Section titled: Binding source parameter inference"></a><h2 id="binding-source-parameter-inference" class="heading-anchor">Binding source parameter inference</h2></div>
<p>A binding source attribute defines the location at which an action parameter's value is found. The following binding source attributes exist:</p>
<div class="has-inner-focus"><table aria-label="Table 3" class="table table-sm">
<thead>
<tr>
<th>Attribute</th>
<th>Binding source</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.frombodyattribute" data-linktype="absolute-path"><code>[FromBody]</code></a></td>
<td>Request body</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.fromformattribute" data-linktype="absolute-path"><code>[FromForm]</code></a></td>
<td>Form data in the request body</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.fromheaderattribute" data-linktype="absolute-path"><code>[FromHeader]</code></a></td>
<td>Request header</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.fromqueryattribute" data-linktype="absolute-path"><code>[FromQuery]</code></a></td>
<td>Request query string parameter</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.fromrouteattribute" data-linktype="absolute-path"><code>[FromRoute]</code></a></td>
<td>Route data from the current request</td>
</tr>
<tr>
<td><a href="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/dependency-injection?view=aspnetcore-7.0#action-injection-with-fromservices" data-linktype="relative-path"><code>[FromServices]</code></a></td>
<td>The request service injected as an action parameter</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.http.asparametersattribute" data-linktype="absolute-path"><code>[AsParameters]</code></a></td>
<td><a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-7.0#asparam7" data-linktype="relative-path">Method parameters</a></td>
</tr>
</tbody>
</table></div>
<div class="alert is-warning">
<p class="alert-title"><span class="docon docon-status-warning-outline" aria-hidden="true"></span> Warning</p>
<p>Don't use <code>[FromRoute]</code> when values might contain <code>%2f</code> (that is <code>/</code>). <code>%2f</code> won't be unescaped to <code>/</code>. Use <code>[FromQuery]</code> if the value might contain <code>%2f</code>.</p>
</div>
<p>Without the <code>[ApiController]</code> attribute or binding source attributes like <code>[FromQuery]</code>, the ASP.NET Core runtime attempts to use the complex object model binder. The complex object model binder pulls data from value providers in a defined order.</p>
<p>In the following example, the <code>[FromQuery]</code> attribute indicates that the <code>discontinuedOnly</code> parameter value is provided in the request URL's query string:</p>
<div class="codeHeader" id="code-try-12" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" highlight-lines="3" data-author-content="[HttpGet]
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
"><span>[<span class="hljs-meta">HttpGet</span>]
<span class="hljs-keyword">public</span> ActionResult&lt;List&lt;Product&gt;&gt; Get(</span>
<mark>    [<span class="hljs-meta">FromQuery</span>] <span class="hljs-built_in">bool</span> discontinuedOnly = <span class="hljs-literal">false</span>)</mark>
<span>{
    List&lt;Product&gt; products = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">if</span> (discontinuedOnly)
    {
        products = _productsInMemoryStore.Where(p =&gt; p.IsDiscontinued).ToList();
    }
    <span class="hljs-keyword">else</span>
    {
        products = _productsInMemoryStore;
    }

    <span class="hljs-keyword">return</span> products;
}
</span></code></pre>
<p>The <code>[ApiController]</code> attribute applies inference rules for the default data sources of action parameters. These rules save you from having to identify binding sources manually by applying attributes to the action parameters. The binding source inference rules behave as follows:</p>
<ul>
<li><code>[FromServices]</code> is inferred for complex type parameters registered in the DI Container.</li>
<li><code>[FromBody]</code> is inferred for complex type parameters not registered in the DI Container. An exception to the <code>[FromBody]</code> inference rule is any complex, built-in type with a special meaning, such as <a href="/en-us/dotnet/api/microsoft.aspnetcore.http.iformcollection" class="no-loc" data-linktype="absolute-path">IFormCollection</a> and <a href="/en-us/dotnet/api/system.threading.cancellationtoken" class="no-loc" data-linktype="absolute-path">CancellationToken</a>. The binding source inference code ignores those special types.</li>
<li><code>[FromForm]</code> is inferred for action parameters of type <a href="/en-us/dotnet/api/microsoft.aspnetcore.http.iformfile" class="no-loc" data-linktype="absolute-path">IFormFile</a> and <a href="/en-us/dotnet/api/microsoft.aspnetcore.http.iformfilecollection" class="no-loc" data-linktype="absolute-path">IFormFileCollection</a>. It's not inferred for any simple or user-defined types.</li>
<li><code>[FromRoute]</code> is inferred for any action parameter name matching a parameter in the route template. When more than one route matches an action parameter, any route value is considered <code>[FromRoute]</code>.</li>
<li><code>[FromQuery]</code> is inferred for any other action parameters.</li>
</ul>
<div class="heading-wrapper" data-heading-level="h3"><a class="anchor-link docon docon-link" href="#frombody-inference-notes" aria-label="Section titled: FromBody inference notes"></a><h3 id="frombody-inference-notes" class="heading-anchor">FromBody inference notes</h3></div>
<p><code>[FromBody]</code> isn't inferred for simple types such as <code>string</code> or <code>int</code>. Therefore, the <code>[FromBody]</code> attribute should be used for simple types when that functionality is needed.</p>
<p>When an action has more than one parameter bound from the request body, an exception is thrown. For example, all of the following action method signatures cause an exception:</p>
<ul>
<li><p><code>[FromBody]</code> inferred on both because they're complex types.</p>
<div class="codeHeader" id="code-try-13" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" data-author-content="[HttpPost]
public IActionResult Action1(Product product, Order order)
"><span>[<span class="hljs-meta">HttpPost</span>]
<span class="hljs-function"><span class="hljs-keyword">public</span> IActionResult <span class="hljs-title">Action1</span>(<span class="hljs-params">Product product, Order order</span>)
</span></span></code></pre>
</li>
<li><p><code>[FromBody]</code> attribute on one, inferred on the other because it's a complex type.</p>
<div class="codeHeader" id="code-try-14" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" data-author-content="[HttpPost]
public IActionResult Action2(Product product, [FromBody] Order order)
"><span>[<span class="hljs-meta">HttpPost</span>]
<span class="hljs-function"><span class="hljs-keyword">public</span> IActionResult <span class="hljs-title">Action2</span>(<span class="hljs-params">Product product, [FromBody] Order order</span>)
</span></span></code></pre>
</li>
<li><p><code>[FromBody]</code> attribute on both.</p>
<div class="codeHeader" id="code-try-15" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus" role="group" aria-label="Horizontally scrollable code" tabindex="0"><code class="lang-csharp" data-author-content="[HttpPost]
public IActionResult Action3([FromBody] Product product, [FromBody] Order order)
"><span>[<span class="hljs-meta">HttpPost</span>]
<span class="hljs-function"><span class="hljs-keyword">public</span> IActionResult <span class="hljs-title">Action3</span>(<span class="hljs-params">[FromBody] Product product, [FromBody] Order order</span>)
</span></span></code></pre>
</li>
</ul>
<p><a name="FSI7"></a></p>
<div class="heading-wrapper" data-heading-level="h3"><a class="anchor-link docon docon-link" href="#fromservices-inference-notes" aria-label="Section titled: FromServices inference notes"></a><h3 id="fromservices-inference-notes" class="heading-anchor">FromServices inference notes</h3></div>
<p>Parameter binding binds parameters through <a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-7.0" data-linktype="relative-path">dependency injection</a> when the type is configured as a service. This means it's not required to explicitly apply the <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.fromservicesattribute" data-linktype="absolute-path"><code>[FromServices]</code></a> attribute to a parameter. In the following code, both actions return the time:</p>
<div class="codeHeader" id="code-try-16" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" data-author-content="[Route(&quot;[controller]&quot;)]
[ApiController]
public class MyController : ControllerBase
{
    public ActionResult GetWithAttribute([FromServices] IDateTime dateTime) 
                                                        => Ok(dateTime.Now);

    [Route(&quot;noAttribute&quot;)]
    public ActionResult Get(IDateTime dateTime) => Ok(dateTime.Now);
}
"><span>[<span class="hljs-meta">Route(<span class="hljs-string">"[controller]"</span>)</span>]
[<span class="hljs-meta">ApiController</span>]
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">MyController</span> : <span class="hljs-title">ControllerBase</span>
{
    <span class="hljs-function"><span class="hljs-keyword">public</span> ActionResult <span class="hljs-title">GetWithAttribute</span>(<span class="hljs-params">[FromServices] IDateTime dateTime</span>)</span> 
                                                        =&gt; Ok(dateTime.Now);

    [<span class="hljs-meta">Route(<span class="hljs-string">"noAttribute"</span>)</span>]
    <span class="hljs-function"><span class="hljs-keyword">public</span> ActionResult <span class="hljs-title">Get</span>(<span class="hljs-params">IDateTime dateTime</span>)</span> =&gt; Ok(dateTime.Now);
}
</span></code></pre>
<p>In rare cases, automatic DI can break apps that have a type in DI that is also accepted in an API controller's action methods. It's not common to have a type in DI and as an argument in an API controller action.</p>
<p>To disable <code>[FromServices]</code> inference for a single action parameter, apply the desired binding source attribute to the parameter. For example, apply the <code>[FromBody]</code> attribute to an action parameter that should be bound from the body of the request.</p>
<p>To disable <code>[FromServices]</code> inference globally, set <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.apibehavioroptions.disableimplicitfromservicesparameters" data-linktype="absolute-path">DisableImplicitFromServicesParameters</a> to <code>true</code>:</p>
<div class="codeHeader" id="code-try-17" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" highlight-lines="8-11" data-author-content="using Microsoft.AspNetCore.Mvc;

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
"><span><span class="hljs-keyword">using</span> Microsoft.AspNetCore.Mvc;

<span class="hljs-keyword">var</span> builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton&lt;IDateTime, SystemDateTime&gt;();
</span>
<mark>builder.Services.Configure&lt;ApiBehaviorOptions&gt;(options =&gt;
{
    options.DisableImplicitFromServicesParameters = <span class="hljs-literal">true</span>;
});</mark>
<span>
<span class="hljs-keyword">var</span> app = builder.Build();

app.MapControllers();

app.Run();
</span></code></pre>
<p>Types are checked at app startup with <a href="/en-us/dotnet/api/microsoft.extensions.dependencyinjection.iserviceproviderisservice" class="no-loc" data-linktype="absolute-path">IServiceProviderIsService</a> to determine if an argument in an API controller action comes from DI or from the other sources.</p>
<p>The mechanism to infer binding source of API Controller action parameters uses the following rules:</p>
<ul>
<li>A previously specified <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.modelbinding.bindinginfo.bindingsource#microsoft-aspnetcore-mvc-modelbinding-bindinginfo-bindingsource" data-linktype="absolute-path"><code>BindingInfo.BindingSource</code></a> is never overwritten.</li>
<li>A complex type parameter, registered in the DI container, is assigned <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.modelbinding.bindingsource.services" data-linktype="absolute-path"><code>BindingSource.Services</code></a>.</li>
<li>A complex type parameter, not registered in the DI container, is assigned <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.modelbinding.bindingsource.body" data-linktype="absolute-path"><code>BindingSource.Body</code></a>.</li>
<li>A parameter with a name that appears as a route value in <em><strong>any</strong></em> route template is assigned <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.modelbinding.bindingsource.path" data-linktype="absolute-path"><code>BindingSource.Path</code></a>.</li>
<li>All other parameters are <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.modelbinding.bindingsource.query" data-linktype="absolute-path"><code>BindingSource.Query</code></a>.</li>
</ul>
<div class="heading-wrapper" data-heading-level="h3"><a class="anchor-link docon docon-link" href="#disable-inference-rules" aria-label="Section titled: Disable inference rules"></a><h3 id="disable-inference-rules" class="heading-anchor">Disable inference rules</h3></div>
<p>To disable binding source inference, set <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.apibehavioroptions.suppressinferbindingsourcesforparameters#microsoft-aspnetcore-mvc-apibehavioroptions-suppressinferbindingsourcesforparameters" class="no-loc" data-linktype="absolute-path">SuppressInferBindingSourcesForParameters</a> to <code>true</code>:</p>
<div class="codeHeader" id="code-try-18" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" highlight-lines="9" data-author-content="using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressConsumesConstraintForFormFileParameters = true;
        options.SuppressInferBindingSourcesForParameters = true;
        options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            &quot;https://httpstatuses.com/404&quot;;
        options.DisableImplicitFromServicesParameters = true;
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
"><span><span class="hljs-keyword">using</span> Microsoft.AspNetCore.Mvc;

<span class="hljs-keyword">var</span> builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =&gt;
    {
        options.SuppressConsumesConstraintForFormFileParameters = <span class="hljs-literal">true</span>;</span>
<mark>        options.SuppressInferBindingSourcesForParameters = <span class="hljs-literal">true</span>;</mark>
<span>        options.SuppressModelStateInvalidFilter = <span class="hljs-literal">true</span>;
        options.SuppressMapClientErrors = <span class="hljs-literal">true</span>;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            <span class="hljs-string">"https://httpstatuses.com/404"</span>;
        options.DisableImplicitFromServicesParameters = <span class="hljs-literal">true</span>;
    });

<span class="hljs-keyword">var</span> app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
</span></code></pre><div class="heading-wrapper" data-heading-level="h2"><a class="anchor-link docon docon-link" href="#multipartform-data-request-inference" aria-label="Section titled: Multipart/form-data request inference"></a><h2 id="multipartform-data-request-inference" class="heading-anchor">Multipart/form-data request inference</h2></div>
<p>The <code>[ApiController]</code> attribute applies an inference rule for action parameters of type <a href="/en-us/dotnet/api/microsoft.aspnetcore.http.iformfile" class="no-loc" data-linktype="absolute-path">IFormFile</a> and <a href="/en-us/dotnet/api/microsoft.aspnetcore.http.iformfilecollection" class="no-loc" data-linktype="absolute-path">IFormFileCollection</a>. The <code>multipart/form-data</code> request content type is inferred for these types.</p>
<p>To disable the default behavior, set the <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.apibehavioroptions.suppressconsumesconstraintforformfileparameters#microsoft-aspnetcore-mvc-apibehavioroptions-suppressconsumesconstraintforformfileparameters" class="no-loc" data-linktype="absolute-path">SuppressConsumesConstraintForFormFileParameters</a> property to <code>true</code>:</p>
<div class="codeHeader" id="code-try-19" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" highlight-lines="8" data-author-content="using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressConsumesConstraintForFormFileParameters = true;
        options.SuppressInferBindingSourcesForParameters = true;
        options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            &quot;https://httpstatuses.com/404&quot;;
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
"><span><span class="hljs-keyword">using</span> Microsoft.AspNetCore.Mvc;

<span class="hljs-keyword">var</span> builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =&gt;
    {</span>
<mark>        options.SuppressConsumesConstraintForFormFileParameters = <span class="hljs-literal">true</span>;</mark>
<span>        options.SuppressInferBindingSourcesForParameters = <span class="hljs-literal">true</span>;
        options.SuppressModelStateInvalidFilter = <span class="hljs-literal">true</span>;
        options.SuppressMapClientErrors = <span class="hljs-literal">true</span>;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            <span class="hljs-string">"https://httpstatuses.com/404"</span>;
    });

<span class="hljs-keyword">var</span> app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
</span></code></pre><div class="heading-wrapper" data-heading-level="h2"><a class="anchor-link docon docon-link" href="#problem-details-for-error-status-codes" aria-label="Section titled: Problem details for error status codes"></a><h2 id="problem-details-for-error-status-codes" class="heading-anchor">Problem details for error status codes</h2></div>
<p>MVC transforms an error result (a result with status code 400 or higher) to a result with <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.problemdetails" class="no-loc" data-linktype="absolute-path">ProblemDetails</a>. The <code>ProblemDetails</code> type is based on the <a href="https://tools.ietf.org/html/rfc7807" data-linktype="external">RFC 7807 specification</a> for providing machine-readable error details in an HTTP response.</p>
<p>Consider the following code in a controller action:</p>
<div class="codeHeader" id="code-try-20" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" data-author-content="if (pet == null)
{
    return NotFound();
}
"><span><span class="hljs-keyword">if</span> (pet == <span class="hljs-literal">null</span>)
{
    <span class="hljs-keyword">return</span> NotFound();
}
</span></code></pre>
<p>The <code>NotFound</code> method produces an HTTP 404 status code with a <code>ProblemDetails</code> body. For example:</p>
<div class="codeHeader" id="code-try-21" data-bi-name="code-header"><span class="language">JSON</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-json" data-author-content="{
  type: &quot;https://tools.ietf.org/html/rfc7231#section-6.5.4&quot;,
  title: &quot;Not Found&quot;,
  status: 404,
  traceId: &quot;0HLHLV31KRN83:00000001&quot;
}
"><span>{
  type: <span class="hljs-string">"https://tools.ietf.org/html/rfc7231#section-6.5.4"</span>,
  title: <span class="hljs-string">"Not Found"</span>,
  status: <span class="hljs-number">404</span>,
  traceId: <span class="hljs-string">"0HLHLV31KRN83:00000001"</span>
}
</span></code></pre>
<div class="heading-wrapper" data-heading-level="h3"><a class="anchor-link docon docon-link" href="#disable-problemdetails-response" aria-label="Section titled: Disable ProblemDetails response"></a><h3 id="disable-problemdetails-response" class="heading-anchor">Disable ProblemDetails response</h3></div>
<p>The automatic creation of a <code>ProblemDetails</code> for error status codes is disabled when the <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.apibehavioroptions.suppressmapclienterrors" class="no-loc" data-linktype="absolute-path">SuppressMapClientErrors</a> property is set to <code>true</code>. Add the following code:</p>
<div class="codeHeader" id="code-try-22" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" highlight-lines="11" data-author-content="using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressConsumesConstraintForFormFileParameters = true;
        options.SuppressInferBindingSourcesForParameters = true;
        options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            &quot;https://httpstatuses.com/404&quot;;
    });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
"><span><span class="hljs-keyword">using</span> Microsoft.AspNetCore.Mvc;

<span class="hljs-keyword">var</span> builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =&gt;
    {
        options.SuppressConsumesConstraintForFormFileParameters = <span class="hljs-literal">true</span>;
        options.SuppressInferBindingSourcesForParameters = <span class="hljs-literal">true</span>;
        options.SuppressModelStateInvalidFilter = <span class="hljs-literal">true</span>;</span>
<mark>        options.SuppressMapClientErrors = <span class="hljs-literal">true</span>;</mark>
<span>        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            <span class="hljs-string">"https://httpstatuses.com/404"</span>;
    });

<span class="hljs-keyword">var</span> app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
</span></code></pre>
<p><a name="consumes"></a></p>
<div class="heading-wrapper" data-heading-level="h2"><a class="anchor-link docon docon-link" href="#define-supported-request-content-types-with-the-consumes-attribute" aria-label="Section titled: Define supported request content types with the [Consumes] attribute"></a><h2 id="define-supported-request-content-types-with-the-consumes-attribute" class="heading-anchor">Define supported request content types with the [Consumes] attribute</h2></div>
<p>By default, an action supports all available request content types. For example, if an app is configured to support both JSON and XML <a href="https://learn.microsoft.com/en-us/aspnet/core/mvc/models/model-binding?view=aspnetcore-7.0#input-formatters" data-linktype="relative-path">input formatters</a>, an action supports multiple content types, including <code>application/json</code> and <code>application/xml</code>.</p>
<p>The <a href="/en-us/dotnet/api/microsoft.aspnetcore.mvc.consumesattribute" data-linktype="absolute-path">[Consumes]</a> attribute allows an action to limit the supported request content types. Apply the <code>[Consumes]</code> attribute to an action or controller, specifying one or more content types:</p>
<div class="codeHeader" id="code-try-23" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" data-author-content="[HttpPost]
[Consumes(&quot;application/xml&quot;)]
public IActionResult CreateProduct(Product product)
"><span>[<span class="hljs-meta">HttpPost</span>]
[<span class="hljs-meta">Consumes(<span class="hljs-string">"application/xml"</span>)</span>]
<span class="hljs-function"><span class="hljs-keyword">public</span> IActionResult <span class="hljs-title">CreateProduct</span>(<span class="hljs-params">Product product</span>)
</span></span></code></pre>
<p>In the preceding code, the <code>CreateProduct</code> action specifies the content type <code>application/xml</code>. Requests routed to this action must specify a <code>Content-Type</code> header of <code>application/xml</code>. Requests that don't specify a <code>Content-Type</code> header of <code>application/xml</code> result in a <a href="https://developer.mozilla.org/docs/Web/HTTP/Status/415" data-linktype="external">415 Unsupported Media Type</a> response.</p>
<p>The <code>[Consumes]</code> attribute also allows an action to influence its selection based on an incoming request's content type by applying a type constraint. Consider the following example:</p>
<div class="codeHeader" id="code-try-24" data-bi-name="code-header"><span class="language">C#</span>
		<button type="button" class="action position-relative display-none-print" data-bi-name="copy">
			<span class="icon margin-right-xxs" aria-hidden="true">
				<span class="docon docon-edit-copy"></span>
			</span>
			<span>Copy</span>
			<div class="successful-copy-alert position-absolute right-0 top-0 left-0 bottom-0 display-flex align-items-center justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">
				<span class="icon font-size-lg">
					<span class="docon docon-check-mark"></span>
				</span>
			</div>
		</button>
	</div><pre class="has-inner-focus"><code class="lang-csharp" data-author-content="[ApiController]
[Route(&quot;api/[controller]&quot;)]
public class ConsumesController : ControllerBase
{
    [HttpPost]
    [Consumes(&quot;application/json&quot;)]
    public IActionResult PostJson(IEnumerable<int> values) =>
        Ok(new { Consumes = &quot;application/json&quot;, Values = values });

    [HttpPost]
    [Consumes(&quot;application/x-www-form-urlencoded&quot;)]
    public IActionResult PostForm([FromForm] IEnumerable<int> values) =>
        Ok(new { Consumes = &quot;application/x-www-form-urlencoded&quot;, Values = values });
}
"><span>[<span class="hljs-meta">ApiController</span>]
[<span class="hljs-meta">Route(<span class="hljs-string">"api/[controller]"</span>)</span>]
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">ConsumesController</span> : <span class="hljs-title">ControllerBase</span>
{
    [<span class="hljs-meta">HttpPost</span>]
    [<span class="hljs-meta">Consumes(<span class="hljs-string">"application/json"</span>)</span>]
    <span class="hljs-function"><span class="hljs-keyword">public</span> IActionResult <span class="hljs-title">PostJson</span>(<span class="hljs-params">IEnumerable&lt;<span class="hljs-built_in">int</span>&gt; values</span>)</span> =&gt;
        Ok(<span class="hljs-keyword">new</span> { Consumes = <span class="hljs-string">"application/json"</span>, Values = values });

    [<span class="hljs-meta">HttpPost</span>]
    [<span class="hljs-meta">Consumes(<span class="hljs-string">"application/x-www-form-urlencoded"</span>)</span>]
    <span class="hljs-function"><span class="hljs-keyword">public</span> IActionResult <span class="hljs-title">PostForm</span>(<span class="hljs-params">[FromForm] IEnumerable&lt;<span class="hljs-built_in">int</span>&gt; values</span>)</span> =&gt;
        Ok(<span class="hljs-keyword">new</span> { Consumes = <span class="hljs-string">"application/x-www-form-urlencoded"</span>, Values = values });
}
</span></code></pre>
<p>In the preceding code, <code>ConsumesController</code> is configured to handle requests sent to the <code>https://localhost:5001/api/Consumes</code> URL. Both of the controller's actions, <code>PostJson</code> and <code>PostForm</code>, handle POST requests with the same URL. Without the <code>[Consumes]</code> attribute applying a type constraint, an ambiguous match exception is thrown.</p>
<p>The <code>[Consumes]</code> attribute is applied to both actions. The <code>PostJson</code> action handles requests sent with a <code>Content-Type</code> header of <code>application/json</code>. The <code>PostForm</code> action handles requests sent with a <code>Content-Type</code> header of <code>application/x-www-form-urlencoded</code>.</p>
<div class="heading-wrapper" data-heading-level="h2"><a class="anchor-link docon docon-link" href="#additional-resources" aria-label="Section titled: Additional resources"></a><h2 id="additional-resources" class="heading-anchor">Additional resources</h2></div>
<ul>
<li><a href="https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/index/samples" data-linktype="external">View or download sample code</a>. (<a href="https://learn.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-7.0#how-to-download-a-sample" data-linktype="relative-path">How to download</a>).</li>
<li><a href="https://learn.microsoft.com/en-us/aspnet/core/web-api/action-return-types?view=aspnetcore-7.0" data-linktype="relative-path">Controller action return types in ASP.NET Core web API</a></li>
<li><a href="https://learn.microsoft.com/en-us/aspnet/core/web-api/handle-errors?view=aspnetcore-7.0" data-linktype="relative-path">Handle errors in ASP.NET Core web APIs</a></li>
<li><a href="https://learn.microsoft.com/en-us/aspnet/core/web-api/advanced/custom-formatters?view=aspnetcore-7.0" data-linktype="relative-path">Custom formatters in ASP.NET Core Web API</a></li>
<li><a href="https://learn.microsoft.com/en-us/aspnet/core/web-api/advanced/formatting?view=aspnetcore-7.0" data-linktype="relative-path">Format response data in ASP.NET Core Web API</a></li>
<li><a href="https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger?view=aspnetcore-7.0" data-linktype="relative-path">ASP.NET Core web API documentation with Swagger / OpenAPI</a></li>
<li><a href="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing?view=aspnetcore-7.0" data-linktype="relative-path">Routing to controller actions in ASP.NET Core</a></li>
<li><a href="/en-us/connectors/custom-connectors/port-tunneling" data-linktype="absolute-path">Use port tunneling Visual Studio to debug web APIs</a></li>
<li><a href="/en-us/training/modules/build-web-api-aspnet-core/" data-linktype="absolute-path">Create a web API with ASP.NET Core</a></li>
</ul>
</div>
