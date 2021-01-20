console.log("我是main.js");

getCSS.onclick = () => {
  //4个步骤加载CSS
  //1.创建HttpRequest对象 全称为XMLHttpRequest
  const request = new XMLHttpRequest();
  //2.调用对象的open方法 open(method,url)
  request.open("GET", "/style.css");
  //3.监听对象的onload & onerror事件
  request.onload = () => {
    console.log(request.response);
    console.log("成功了");
    //创建style标签
    const style = document.createElement("style");
    //填写style内容
    style.innerHTML = request.response;
    //插到head里面
    document.head.appendChild(style);
  };
  request.onerror = () => {
    console.log("失败了");
  };
  //4.发送请求
  request.send();
};

getJS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/2.js");
  request.onload = () => {
    console.log(request.response);
    const script = document.createElement("script");
    script.innerHTML = request.response;
    document.body.appendChild(script);
  };
  request.onerror = () => {};
  request.send();
};

getHTML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/3.html");
  //常用onreadystatechange
  request.onreadystatechange = () => {
    console.log(request.readyState);
    //下载完成,但是不知道是成功还是失败
    if (request.readyState === 4) {
      console.log("下载完成");
      if (request.status >= 200 && request.status < 300) {
        const div = document.createElement("div");
        div.innerHTML = request.response;
        document.body.appendChild(div);
      } else {
        alert("加载HTML失败");
      }
      console.log(request.response);
    }
  };
  request.send();
};

getXML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/4.xml");
  request.onreadystatechange = () => {
    console.log(request.readyState);
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const dom = request.responseXML;
        const text = dom.getElementsByTagName("warning")[0].textContent;
        console.log(text);
        console.log(text.trim());
      } else {
        alert("加载XML失败");
      }
      console.log(request.response);
    }
  };
  request.send();
};

getJSON.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("get", "/5.json");
  request.onreadystatechange = () => {
    if ((request.readyState === 4) & (request.status === 200)) {
      console.log(request.response);
      const bool = JSON.parse(request.response);
      myName.innerHTML = bool.name;
      console.log(bool);
    }
  };
  request.send();
};

let n = 1;
getPage.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", `/page${n + 1}`);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const array = JSON.parse(request.response);
      array.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.id;
        xxx.appendChild(li);
      });
      n += 1;
    }
  };
  request.send();
};
