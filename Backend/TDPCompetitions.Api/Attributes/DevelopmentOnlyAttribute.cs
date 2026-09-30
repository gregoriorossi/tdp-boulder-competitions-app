using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TDPCompetitions.Api.Attributes;

/// <summary>
/// Action filter that returns 404 if the application is not running in Development environment
/// </summary>
public class DevelopmentOnlyAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var env = context.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();

        if (!env.IsDevelopment())
        {
            context.Result = new NotFoundResult();
        }

        base.OnActionExecuting(context);
    }
}
