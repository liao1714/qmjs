import { addTemplate, templateQuery, templateFieldQuery, delFormTemplate, EditTemplate, findByIdTemplate  } from '@/services/formTemplate'
import { formatDate } from '@/utils/utils'

const FormTemplateModel = {
  namespace: 'formTemplate',
  state: {
    templateList: [],

    formComponentList: [
     
    ],

    globalEditForm: [],



    


    curChooseTemplateId: '',
    changeTemplatedId: '',
  

    commonTemplateField: [],

  
  },
  effects: {
    *templateQuery({ payload }, { call, put }) {
      const response = yield call(templateQuery, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setTemplateList',
          payload: response.data,
        })
      }
      return response
    },


    //常用报名表单查询
    *templateFieldQuery({ payload }, { call, put }) {
      const response = yield call(templateFieldQuery, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setTemplateField',
          payload: response.data,
        })
      }
      return response
    },


    //添加模板
    *addTemplate({ payload }, { call }) {
      return yield call(addTemplate, payload)
    },




    //删除模板
    *delFormTemplate({ payload }, { call, put }) {
      return yield call(delFormTemplate, payload)
    },


    //编辑模板
    *EditTemplate({ payload }, { call, put }) {
      return yield call(EditTemplate, payload)
    },


    //查找模板下的所有
    *findByIdTemplate({ payload }, { call, put }) {
      const response = yield call(findByIdTemplate, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setComponentsList',
          payload: response.data.formFieldBos,
        })
        // yield put({
        //   type: 'setGlobalEditForm',
        //   payload: response.data.formFieldBos,
        // })
      }
      return response
    },

    *findEditByIdTemplate({ payload }, { call, put }) {
      const response = yield call(findByIdTemplate, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setGlobalEditForm',
          payload: response.data.formFieldBos,
        })
      
      }
      return response
    },


  


  },
  reducers: {
    setTemplateList(state, { payload }) {
      return { ...state, templateList: payload }
    },

    setComponentsList(state, { payload }) {
      // payload.formFieldBos = payload.formFieldBos ? payload.formFieldBos : [];

      
      payload = payload ? payload : []
      console.log('formComponentList会被设置成')
      console.log(payload)
      return { ...state, formComponentList: payload }
    },

    setCurChooseTemplate(state, { payload }) {
      console.log('开始设置state')
      return { ...state, curChooseTemplateId: payload }
    },

    setChangeTemplateId(state, { payload }) {
      console.log('开始设置state------------------')
      return { ...state, changeTemplatedId: payload }
    },


    setTemplateField(state, { payload }) {
      return { ...state, commonTemplateField: payload }
    },


    
    setGlobalEditForm(state, { payload }) {
      return { ...state, globalEditForm: payload }
    },









  },
}
export default FormTemplateModel
