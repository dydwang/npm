const { export_json_to_excel } =  require('./Export2Excel'); //这里必须使用绝对路径，使用@/+存放export2Excel的路径

export default function export2Excel(lists,excelName) {
    require.ensure([], () => {
        let listHeader=[]  //表头
        let listVal=[]
        let header=lists[0]
        for(let i in header){
            listHeader.push(i)
            listVal.push(i)
        }
        const listData = formatJson(listVal, lists);
        console.log(listData)
        export_json_to_excel(listHeader, listData, excelName);// 导出的表格名称，根据需要自己命名
    })
}
//格式转换
function formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
}
