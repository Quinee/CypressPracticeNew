const { defineConfig } = require("cypress");
const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const ExcelJs =require('exceljs');

module.exports = defineConfig({
  reporter:"cypress-mochawesome-reporter",
  reporterOptions: {
   
    embeddedScreenshots: true,
    videoOnFailOnly:false,
    saveAllAttempts:true,
    overwrite:false,
    reportsDir:"reports/demoFolder"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task',{

        excelToJsonConverter(filePath)
        {
          const result = excelToJson({
          source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
        });
        return result;
        }
  })
  on('task', {

    async writeExcelTest({searchText,replaceText,change,filePath})
     {
         
       const workbook = new ExcelJs.Workbook();
       await workbook.xlsx.readFile(filePath);
       const worksheet = workbook.getWorksheet('Sheet1');
       const output= await readExcel(worksheet,searchText);
     
       const cell = worksheet.getCell(output.row,output.column+change.colChange);
       cell.value = replaceText;
       //pending resolved rejected
       return workbook.xlsx.writeFile(filePath).then(()=>
       {
         return true;
       })
       .catch((error)=>
         {
           return false;
         })
 
     
     }
 
   })
      
    },
    specPattern: 'cypress/integration/examples/*.js',
    screenshotsFolder: 'cypress/failure/screenshots',
    
    
  },
  env:{
    url:"https://rahulshettyacademy.com"
  }
});
async function readExcel(worksheet,searchText)
{
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber) =>
    {
          row.eachCell((cell,colNumber) =>
          {
              if(cell.value === searchText)
              {
                  output.row=rowNumber;
                  output.column=colNumber;
              }
  
  
          }  )
    
    })
    return output;
}
