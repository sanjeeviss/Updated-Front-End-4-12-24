export const inputpaymEmployeeLeaveForm= [
    
    {
        name:"PnCompanyId",
        placeholder:"Enter Company Id ",
        label:"Company Id",
        variant:"outlined",
        fullWidth:true,
        required:true,
        
        xs:12,sm:12,
        
        },
        {
            name:"pn_BranchID",
            placeholder:"Enter pn  Branch ID ",
            label:"pn Branch ID",
            variant:"outlined",
            fullWidth:true,
            required:true,
            
            xs:12,sm:12,
           
            },
            {
                name:"pn_EmployeeID",
                placeholder:"Employee ID ",
                label:"Employee ID",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                },


                {
                    name:"pn_leaveID",
                    placeholder:"Enter Leave ID ",
                    label:"Leave ID",
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
                        name:"From_Status",
                        placeholder:"Enter From Status ",
                        label:"From Status",
                        variant:"outlined",
                        fullWidth:true,
                        required:true,
                        
                        xs:12,sm:12,
                        },
                        {
                            name:"To_Status",
                            placeholder:"Enter To Status ",
                            label:"To Status",
                            variant:"outlined",
                            fullWidth:true,
                            required:true,
                            
                            xs:12,sm:12,
                            },
                            {
                                name:"Leave_Count",
                                placeholder:"Enter Leave Count ",
                                label:"Leave Count",
                                variant:"outlined",
                                fullWidth:true,
                                required:true,
                                
                                xs:12,sm:12,
                                },
                                
                                           
                
                    ]