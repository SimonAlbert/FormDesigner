## 目录说明
> DataSourceDesigner是数据源设计  

> FormCreator是表单查看/填写页面  
> 接受viewID和busiID  
> viewID可以关联到formId和viewContent  
> formId和busiID可以取出业务数据formArtifact
> viewContent和formArtifact可以结合实现表单的填写和渲染  

> ListCreator是列表查看/填写页面  
> 接受viewId  
> 使用使用viewId关联到formId和listContent  
> formId和listContent可以实现列表渲染  

> ViewDesigner是表单设计页面  
> 接受viewId  
> viewId关联到forminfo和fieldinfo，表单设计器可以基于这些创建出表单构造viewContent  
> 讲viewContent保存到viewinfo  

> ListDesigner是列表设计页面  
> 
