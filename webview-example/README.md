### HTML

#### 标签
`<head>` 标签 包含页面的元数据和资源链接，不直接显示在页面上。
`<body>` 标签 包含页面的可视化内容，是用户实际看到和交互的部分。
`<div>`标签是一个通用的容器元素，它会在页面上独占一行，默认宽度撑满父容器。
`<span>` 是一个行内元素（inline），它不会自己换行，适合包裹需要和文本或其他行内元素并排显示的小块内容。

#### Class
通过在多个元素上使用相同的 class 名称，可以让它们共享一套 CSS 规则。
___


### CSS
CSS中class规则可以使用`.class`模式来统一定义
在某个class下的特定label的规则，可以使用`.class label`来定义

___


### ViewProvider

#### resolveWebviewView
ViewProvider里面最重要的函数是`resolveWebviewView(webviewView: vscode.WebviewView): void`，它决定了WebView如何进行渲染。

其中的参数`webviewView`是extension在运行的时候自动生成并传入的，也就是extension运行了多少个ViewProvider就会自动生成多少个webviewView实例并传递给相应的provider，如果该webviewView实例在Provider类中的其他地方被使用，可以考虑将其存储到一个私有变量中。

#### URI
WebView运行在沙箱环境中，默认不能直接访问本地磁盘文件。如果需要访问本地文件，需要：
1. 通过`localResourceRoots`注册受信任资源
2. 使用`webview.asWebviewUri(...)`进行路径映射，生成一个特殊的路径字符串，让WebView可以识别相应的文件资源。
   需要注意，`webview.asWebviewUri(...)`需要先使用函数`vscode.Uri.file`将本地文件转换为本地文件URI，再转换为WebView专用的URI