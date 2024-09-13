export const inputpaymLevelForm= [
    
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
            placeholder:"Enter Branch ID ",
            label:"Branch ID",
            variant:"outlined",
            fullWidth:true,
            required:true,
            
            xs:12,sm:12,
           
           
            },
            {
                name:"v_LevelName",
                placeholder:"V Level Name",
                label:"V Level Name",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                },

                {
                    name:"status",
                    placeholder:"status",
                    label:"status",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12,
                    
                    }

                ]

                   