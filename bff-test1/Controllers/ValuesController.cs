using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace bff_test1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/get?email=alejo@gmail.com
        [HttpGet("get/")]
        public async Task<ActionResult<Object>> Get([Required][FromQuery(Name = "email")] string email)
        {
            var uri = "http://localhost:8080/userdataaccess/get?email=" + email;

            var request = new HttpRequestMessage(HttpMethod.Get, uri);
            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("User-Agent", "Transactional-Portal");

            var handler = new HttpClientHandler();
            handler.Proxy = new WebProxy("http://proxy.epm.com.co:8080", true) { UseDefaultCredentials = true };
            HttpClient client = new HttpClient(handler);
            // HttpClient client = new HttpClient();

            HttpResponseMessage response;
            try
            {
                response = await client.SendAsync(request);
            }
            catch (HttpRequestException e)
            {
                response = new HttpResponseMessage(HttpStatusCode.GatewayTimeout)
                {
                    Content = new StringContent(e.Message),
                    StatusCode = HttpStatusCode.InternalServerError,
                    RequestMessage = request
                };
            }

            var content = response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                this.HttpContext.Response.StatusCode = 500;

                Console.WriteLine("* * * * * * * *");
                Console.WriteLine("Request Message:");
                Console.WriteLine("================");
                Console.WriteLine(response.RequestMessage);
                Console.WriteLine();
                Console.WriteLine("Response Message:");
                Console.WriteLine("================");
                Console.WriteLine(content.Result);
                Console.WriteLine();
                Console.WriteLine("* * * * * * * *");

                return null;
            }

            return JsonConvert.DeserializeObject(content.Result);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("put/")]
        public async Task<IActionResult> Put([Required][FromQuery(Name = "email")] string email, [FromBody] User user)
        {
            user.email = email;

            var uri = "http://localhost:8080/userdataaccess/add" +
                "?email=" + user.email +
                "&name=" + user.name +
                "&idType=" + user.idType +
                "&idNumber=" + user.idNumber +
                "&birthday=" + user.birthday +
                "&state=" + user.state +
                "&city=" + user.city +
                "&address=" + user.address +
                "&homePhone=" + user.homePhone +
                "&cellPhone=" + user.cellPhone;

            var request = new HttpRequestMessage(HttpMethod.Get, uri);
            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("User-Agent", "Transactional-Portal");

            var handler = new HttpClientHandler();
            handler.Proxy = new WebProxy("http://proxy.epm.com.co:8080", true) { UseDefaultCredentials = true };
            HttpClient client = new HttpClient(handler);
            // HttpClient client = new HttpClient();

            HttpResponseMessage response;
            try
            {
                response = await client.SendAsync(request);
            }
            catch (HttpRequestException e)
            {
                response = new HttpResponseMessage(HttpStatusCode.GatewayTimeout)
                {
                    Content = new StringContent(e.Message),
                    StatusCode = HttpStatusCode.InternalServerError,
                    RequestMessage = request
                };
            }

            var content = response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                this.HttpContext.Response.StatusCode = 500;

                Console.WriteLine("* * * * * * * *");
                Console.WriteLine("Request Message:");
                Console.WriteLine("================");
                Console.WriteLine(response.RequestMessage);
                Console.WriteLine();
                Console.WriteLine("Response Message:");
                Console.WriteLine("================");
                Console.WriteLine(content.Result);
                Console.WriteLine();
                Console.WriteLine("* * * * * * * *");

                return StatusCode(500);
            }

            return NoContent();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
