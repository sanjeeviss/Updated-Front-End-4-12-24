
export const inputpaymDeductionForm= [
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
            name:"pn_BranchID",
            placeholder:"Enter pn Branch ID ",
            label:"pn Branch ID",
            variant:"outlined",
            fullWidth:true,
            required:true,
            
            xs:12,sm:12,
           
            },
    
    {
        name:"v_DeductionCode",
        placeholder:"Enter V Deduction Code ",
        label:" V Deduction Code",
        variant:"outlined",
        fullWidth:true,
        required:true,
        
        xs:12,sm:12
        },

        {
            name:"v_DeductionName",
            placeholder:"Enter V Deduction Name ",
            label:"V Deduction Name",
            variant:"outlined",
            fullWidth:true,
            required:true,
            
            xs:12,sm:12
            },

            {
                name:"c_Regular",
                placeholder:"Enter C Regular ",
                label:"C Regular",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12
                },
                {
                    name:"c_Print",
                    placeholder:"Enter C Print",
                    label:"C Print",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12
                    },
    
           

            {
                name:"Status",
                placeholder:"Enter Status ",
                label:"Status",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12
                },

                {
                    name:"d_order",
                    placeholder:"Enter D order ",
                    label:"D order",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12
                    }

                ]