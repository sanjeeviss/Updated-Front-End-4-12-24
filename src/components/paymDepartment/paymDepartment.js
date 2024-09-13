export const inputpaymDepartmentForm= [
    
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
            name:"BranchID",
            placeholder:"Enter Branch Id ",
            label:"Branch Id",
            variant:"outlined",
            fullWidth:true,
            required:true,
            
            xs:12,sm:12,
            
            },

            {
                name:"v_DepartmentName",
                placeholder:"Enter V Department Name ",
                label:"V Department Name",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                },

                {
                    name:"status",
                    placeholder:"Enter Status ",
                    label:"Status",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12,
                    },

                
                    ]