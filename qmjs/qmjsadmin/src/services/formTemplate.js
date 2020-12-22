import request from '@/utils/request';

export async function addTemplate(params) {
  return request('/api/v1/backstage/formTemplate/addTemplate', {
    method: 'POST',
    data: params,
  });
}

//编辑表单模板 的组件内容
export async function EditTemplate(params) {
  return request('/api/v1/backstage/formTemplate/editTemplate', {
    method: 'PUT',
    data: params,
  });
}

//查询出所有表单模板
export async function templateQuery(params) {
  return request('/api/v1/backstage/formTemplate/findTemplate', {
    method: 'GET',
    data: params,
  });
}

//查询出某个表单模板中的 所有组件
export async function findByIdTemplate(params) {
  return request('/api/v1/backstage/formTemplate/findByIdTemplate', {
    method: 'GET',
    params: params,
  });
}

//删除表单
export async function delFormTemplate(params) {
  return request('/api/v1/backstage/formTemplate/deleteTemplate', {
    method: 'DELETE',
    data: params,
  });
}


//获取常用表单字段
export async function templateFieldQuery(params) {
  return request('/api/v1/backstage/formTemplate/findTemplateField', {
    method: 'GET',
    params: params,
  }) 
}


