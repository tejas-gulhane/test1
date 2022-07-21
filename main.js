// axios.defaults.header.common["x-Auth -Token"]='sometoken'




function getTodos() {
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(res => {showOutput(res)})
  .catch(err =>{console.log(err)})
  }
  
  // POST REQUEST
  function addTodo() {
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      data:"hii"
    })
  .then(res => {showOutput(res)})
  .catch(err =>{console.log(err)})
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    // PUT
    axios.put('https://jsonplaceholder.typicode.com/todos/1',{
      data:"hii",id:1
    })
    .then(res => {showOutput(res)})
    .catch(err =>{console.log(err)})
 
  // PATCH
    axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
      data:"hii",id:1
    })
  .then(res => {showOutput(res)})
  .catch(err =>{console.log(err)})
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {showOutput(res)})
  .catch(err =>{console.log(err)})
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    axios.all([
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'), 
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    .then(
      res => showOutput(res[1])
    )
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
  
    const config={
      header: {
        title:"hello world"
      }
    }
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      data:"hii"
    },config)
  .then(res => {showOutput(res)})
  .catch(err =>{console.log(err)})
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    
    const options={
      method:"post",
      url:'https://jsonplaceholder.typicode.com/todos',
      data:{
        title:"hello world"
      },
      transformResponse:axios.defaults.transformResponse.concat(
        data =>{
          data.title=data.title.toUpperCase();
          return data;
        }
      )
    }
    axios(options).then(res => showOutput(res))
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios.get('https://jsonplaceholder.typicode.com/todoss')
    .then(res => {showOutput(res)})
    .catch(err => 
      {
        if(err.response.status==404)
        {
        alert("Page Not Found")
        }
      }
    )
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    const source=axios.cancelToken.source()

    axios.get('https://jsonplaceholder.typicode.com/todos',{
      cancelToken:source.token
    })
    .then(res => {showOutput(res)})
    .catch(
      out =>{
        if(axios.isCancel(out)){
          console.log("req.cancel",out.message)
        }

      }
    );
    if(true){
      source.cancel("Req cancel")
    }

  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  
  axios.interceptors.request.use(
    config => {
    console.log(`${config.method} req set to ${config.url} at ${new Date().getTime()}`)
    return  config;
  })
  // AXIOS INSTANCES
  
  const AxiosInstnt=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
  })
  AxiosInstnt.get('/comments').then(res => {showOutput(res)})
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);

  