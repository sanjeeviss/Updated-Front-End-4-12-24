 export const inputFormElements = [
    {
    name:"PnCompanyId",
    placeholder:"Enter Company Id ",
    label:"Company Id",
    variant:"outlined",
    fullWidth:true,
    required:true,
    
    xs:12,sm:12,
    select:true, 
    options: [
        {value:"1", lable:"Company 1"},
        {value:"2", lable:"Company 2"}
    ]
    },
    {
        name:"BranchId",placeholder:"Enter Branch Id",label:"Branch Id",variant:"outlined",fullWidth:true,
        required:true,xs:12,sm:12,
        select:true, 
        options: [
            {value:"1", lable:"Company 1"},
            {value:"2", lable:"Company 2"}
        ]
        },
        
            {
                name:"AssetName",placeholder:"Enter Asset name",label:"Asset name",variant:"outlined",fullWidth:true,
                required:true,xs:12,sm:12,
                select:true, 
                options: [
                    {value:"1", lable:"Company 1"},
                    {value:"2", lable:"Company 2"}
                ]
                },

]