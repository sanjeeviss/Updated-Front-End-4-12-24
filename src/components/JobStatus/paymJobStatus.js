export const inputpaymJobStatusForm= [
    
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
                name:"v_JobStatusName",
                placeholder:"V JobStatus Name",
                label:"V JobStatus Name",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                },

                {
                    name:"status",
                    placeholder:"Status",
                    label:"Status",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12,
                    
                    }
                ]

                   