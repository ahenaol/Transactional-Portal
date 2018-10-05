using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace bff_test1.Controllers
{
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

        private static async Task<String> CallService()
        {
            var handler = new HttpClientHandler();
            handler.Proxy = new WebProxy("http://proxy.epm.com.co:8080", true){ UseDefaultCredentials = true };
            HttpClient client = new HttpClient(handler);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "Transactional Portal");

            try
            {
                var stringTask = client.GetStringAsync(
                    "http://localhost:8080/userdataaccess/get?email=alejo.catson@gmail.com");
                var msg = await stringTask;
                return msg;
            }
            catch(HttpRequestException e)
            {
                return e.Message;
            }

        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Object> Get(int id)
        {
            var val1 = CallService().Result;
            Console.WriteLine(JsonConvert.DeserializeObject(val1));
            return JsonConvert.DeserializeObject(val1);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
