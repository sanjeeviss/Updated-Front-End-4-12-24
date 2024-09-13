export const inputondutyForm= [
    {
        name:"Ref_no",
        placeholder:"Enter Ref No ",
        label:"Ref No",
        variant:"outlined",
        fullWidth:true,
        required:true,
        
        xs:12,sm:12,
        },
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
            name:"PnBranchId",
            placeholder:"Enter Branch Id ",
            label:"Branch Id",
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
                name:"empid",
                placeholder:"Enter Emp Id ",
                label:"Emp Id",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                
                },
                {
                    name:"empname",
                    placeholder:"Enter Emp Name ",
                    label:"Emp Name",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12,
                    
                    
                    },

                    {
                        name:"onduty_dat",
                        label:"Onduty Date",
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
                        name:"fstatus",
                        placeholder:"Enter F Status",
                        label:"F Status",
                        variant:"outlined",
                        fullWidth:true,
                        required:true,
                        
                        xs:12,sm:12,
                        
                        
                        },

                        {
                            name:"todat",
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
                            name:"tstatus",
                            placeholder:"Enter T Status",
                            label:"T Status",
                            variant:"outlined",
                            fullWidth:true,
                            required:true,
                            
                            xs:12,sm:12,
                            
                            
                            },

                            {
                                name:"tot_days",
                                placeholder:"Enter Tot days",
                                label:"Tot days",
                                variant:"outlined",
                                fullWidth:true,
                                required:true,
                                
                                xs:12,sm:12,
                                
                                
                                },

                                {
                                    name:"sub_dat",
                                    label:"Sub Date",
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
                                    name:"reason",
                                    placeholder:"Enter Reason",
                                    label:"Reason",
                                    variant:"outlined",
                                    fullWidth:true,
                                    required:true,
                                    
                                    xs:12,sm:12,
                                    
                                    
                                },

                                {
                                    name:"priority",
                                    placeholder:"Enter Priority",
                                    label:"Priority",
                                    variant:"outlined",
                                    fullWidth:true,
                                    required:true,
                                    
                                    xs:12,sm:12,
                                    
                                    
                                },

                                {
                                    name:"approval",
                                    placeholder:"Enter Approval",
                                    label:"Approval",
                                    variant:"outlined",
                                    fullWidth:true,
                                    required:true,
                                    
                                    xs:12,sm:12,
                                    
                                    
                                },

                                {
                                    name:"Message1",
                                    placeholder:"Enter Message 1",
                                    label:"Message 1",
                                    variant:"outlined",
                                    fullWidth:true,
                                    required:true,
                                    
                                    xs:12,sm:12,
                                    
                                    
                                },

                                {
                                    name:"Message2",
                                    placeholder:"Enter Message 2",
                                    label:"Message 2",
                                    variant:"outlined",
                                    fullWidth:true,
                                    required:true,
                                    
                                    xs:12,sm:12,
                                    
                                    
                                },

                                {
                                    name:"Message3",
                                    placeholder:"Enter Message 3",
                                    label:"Message 3",
                                    variant:"outlined",
                                    fullWidth:true,
                                    required:true,
                                    
                                    xs:12,sm:12,
                                    
                                    
                                },

                                {
                                    name:"Message4",
                                    placeholder:"Enter Message 4",
                                    label:"Message 4",
                                    variant:"outlined",
                                    fullWidth:true,
                                    required:true,
                                    
                                    xs:12,sm:12,
                                    
                                    
                                },
                    ]