# 兼容性

## Unity版本

最低版本支持**2019.4**，可支持从1.x到目前的版本，一旦老API被弃用就会被修改为新的。参考Unity更新 [TECH stream](https://blogs.unity3d.com/2018/04/09/new-plans-for-unity-releases-introducing-the-tech-and-long-term-support-lts-streams/) is added once they're out of beta.

推荐保持使用最新的2019LTS长期服务版本以减少错误。[2019 LTS stream](https://unity3d.com/unity/qa/lts-releases?version=2019.4)

## 平台

所有引擎的跨平台特性和api都可以适配到Unity可发布的平台上。

以下平台是经过测试兼容的：
* Standalone: PC, Mac, Linux
* WebGL
* iOS
* Android
* UWP (IL2CPP scripting backend only)

## 渲染管线

Unity的 [可编程渲染管线](https://docs.unity3d.com/Manual/render-pipelines.html) (URP和HDRP) 部分支持需要额外设置参考 [渲染管线引导](/zh/guide/render-pipelines.md) 获取更多信息。

## Managed Stripping

"Medium" 和 "High" 参考[managed bytecode stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) 预设不支持，使用 "disable" 或者 "Low" 预设 (默认设置)。
