export const inputpaymEmpEarningsForm= [
    
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
            placeholder:"Enter pn  Branch ID ",
            label:"pn Branch ID",
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
                name:"pn_EmployeeID",
                placeholder:"Employee ID ",
                label:"Employee ID",
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
                    name:"pn_EarningsID",
                    placeholder:"Enter Earnings ID ",
                    label:"Earnings ID",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    select:true, 
                options: [
                    {value:"1", lable:"Company 1"},
                    {value:"2", lable:"Company 2"}
                ],
                    
                    xs:12,sm:12,
                   
                    
                    },

                    {
                        name:"Pid",
                        placeholder:"Enter P ID ",
                        label:"P ID",
                        variant:"outlined",
                        fullWidth:true,
                        required:true,
                        
                        xs:12,sm:12,
                       
                        
                        },





       

            {
                name:"n_Amount",
                placeholder:"Enter Amount ",
                label:"Amount",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                },

                {
                    name:"d_Date",
                    label:"Date",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12,
                    type:"datetime-local",
            inputprops: {
                shrink: true
            }
                },

                {
                    name:"c_eligible",
                    placeholder:"Enter C Eligible ",
                    label:"C Eligible",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12,
                    },

                    {
                        name:"from_date",
                        label:"From Date",
                        variant:"outlined",
                        fullWidth:true,
                        required:true,
                        
                        xs:12,sm:12,
                        type:"datetime-local",
                inputprops: {
                    shrink: true
                }
                    },

                    {
                        name:"to_date",
                        label:"To Date",
                        variant:"outlined",
                        fullWidth:true,
                        required:true,
                        
                        xs:12,sm:12,
                        type:"datetime-local",
                inputprops: {
                    shrink: true
                }
                    },

                    {
                        name:"Flag",
                        placeholder:"Enter Flag ",
                        label:"Flag",
                        variant:"outlined",
                        fullWidth:true,
                        required:true,
                        
                        xs:12,sm:12,
                        },
                    
                                           
                
                    ]