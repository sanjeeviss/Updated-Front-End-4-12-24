export const inputpaymCategoryForm= [
    
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
                name:"pn_CategoryID",
                placeholder:"Enter Category ID ",
                label:"Category ID",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                },

            {
                name:"v_CategoryName",
                placeholder:"Enter V Category Name ",
                label:"V Category Name",
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