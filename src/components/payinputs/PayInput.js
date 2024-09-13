export const inputPayInputForm= [
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
                name:"PnEmployeeId",
                placeholder:"Enter Employee Id ",
                label:"Employee Id",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                },
                {
                    name:"d_Date",
                    label:"D Date",
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
                    name:"d_From_Date",
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
                    name:"d_To_Date",
                    label:"To Date",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12,
                    type:"date",
            inputprops: {
                shrink: true
            }
                },
        {
            name:"Calc_Days",
            placeholder:"Enter Calc Days ",
            label:"Calc Days",
            variant:"outlined",
            fullWidth:true,
            required:true,
            
            xs:12,sm:12,
            
            
            },

            {
                name:"Paid_Days",
                placeholder:"Enter Paid Days ",
                label:"Paid Days",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                
                },
    

            {
                name:"Present_Days",
                placeholder:"Enter Present Days ",
                label:"Present Days",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                
                },
            
                {
                    name:"Absent_Days",
                    placeholder:"Enter Absent Days ",
                    label:"Absent Days",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12,
                    },

                    {
                        name:"TotLeave_Days",
                        placeholder:"Enter Tot Leave Days ",
                        label:"Tot Leave Days",
                        variant:"outlined",
                        fullWidth:true,
                        required:true,
                        
                        xs:12,sm:12,
                        },

                        {
                            name:"TotLeave_Days",
                            placeholder:"Enter TotLeaveDays ",
                            label:"TotLeave Days",
                            variant:"outlined",
                            fullWidth:true,
                            required:true,
                            
                            xs:12,sm:12,
                            },

                            {
                                name:"Holidays",
                                placeholder:"Enter Holidays ",
                                label:"Holidays",
                                variant:"outlined",
                                fullWidth:true,
                                required:true,
                                
                                xs:12,sm:12,
                                },

                                {
                                    name:"OnDuty_days",
                                    placeholder:"Enter OnDuty days ",
                                    label:"OnDuty days",
                                    variant:"outlined",
                                    fullWidth:true,
                                    required:true,
                                    
                                    xs:12,sm:12,
                                    },

                                    
                                {
                                    name:"Compoff_Days",
                                    placeholder:"Enter Compoff Days ",
                                    label:"Compoff Days",
                                    variant:"outlined",
                                    fullWidth:true,
                                    required:true,
                                    
                                    xs:12,sm:12,
                                    },

                                    {
                                        name:"Tour_Days",
                                        placeholder:"Enter Tour Days ",
                                        label:"Tour Days",
                                        variant:"outlined",
                                        fullWidth:true,
                                        required:true,
                                        
                                        xs:12,sm:12,
                                        },

                                        {
                                            name:"Att_Bonus",
                                            placeholder:"Enter Att Bonus ",
                                            label:"Att Bonus",
                                            variant:"outlined",
                                            fullWidth:true,
                                            required:true,
                                            
                                            xs:12,sm:12,
                                            },
                                            {
                                                name:"Att_BonusAmount",
                                                placeholder:"Enter Att Bonus Amount ",
                                                label:"Att Bonus Amount",
                                                variant:"outlined",
                                                fullWidth:true,
                                                required:true,
                                                
                                                xs:12,sm:12,
                                                },
                                                {
                                                    name:"OT_HRS",
                                                    placeholder:"Enter OT HRS ",
                                                    label:"OT HRS",
                                                    variant:"outlined",
                                                    fullWidth:true,
                                                    required:true,
                                                    type:"time",
                                                    inputprops: {
                                                        shrink: true
                                                    },
                                                    
                                                    xs:12,sm:12,
                                                    },
                                                    {
                                                        name:"Earn_Arrears",
                                                        placeholder:"Enter Earn Arrears ",
                                                        label:"Earn Arrears ",
                                                        variant:"outlined",
                                                        fullWidth:true,
                                                        required:true,
                                                        
                                                        xs:12,sm:12,
                                                        },
                                                        {
                                                            name:"Ded_Arrears",
                                                            placeholder:"Enter Ded Arrears ",
                                                            label:"Ded Arrears ",
                                                            variant:"outlined",
                                                            fullWidth:true,
                                                            required:true,
                                                            
                                                            xs:12,sm:12,
                                                            },

                                                            {
                                                                name:"ot_Amt",
                                                                placeholder:"Enter ot Amt",
                                                                label:"ot Amt",
                                                                variant:"outlined",
                                                                fullWidth:true,
                                                                required:true,
                                                                
                                                                xs:12,sm:12,
                                                                },
                                                                {
                                                                    name:"Act_Basic",
                                                                    placeholder:"Enter Act Basic ",
                                                                    label:"Act Basic ",
                                                                    variant:"outlined",
                                                                    fullWidth:true,
                                                                    required:true,
                                                                    
                                                                    xs:12,sm:12,
                                                                    },
                                                                    {
                                                                        name:"Earn_Basic",
                                                                        placeholder:"Enter Earn Basic ",
                                                                        label:"Earn Basic ",
                                                                        variant:"outlined",
                                                                        fullWidth:true,
                                                                        required:true,
                                                                        
                                                                        xs:12,sm:12,
                                                                        },
                                                                        {
                                                                            name:"Mode",
                                                                            placeholder:"Enter Mode ",
                                                                            label:"Earn Mode ",
                                                                            variant:"outlined",
                                                                            fullWidth:true,
                                                                            required:true,
                                                                            
                                                                            xs:12,sm:12,
                                                                            },
                                                                            {
                                                                                name:"Flag",
                                                                                placeholder:"Enter Flag ",
                                                                                label:"Earn Flag ",
                                                                                variant:"outlined",
                                                                                fullWidth:true,
                                                                                required:true,
                                                                                
                                                                                xs:12,sm:12,
                                                                                },

                                                                                {
                                                                                    name:"PT_Gross",
                                                                                    placeholder:"Enter PT Gross ",
                                                                                    label:"PT Gross ",
                                                                                    variant:"outlined",
                                                                                    fullWidth:true,
                                                                                    required:true,
                                                                                    
                                                                                    xs:12,sm:12,
                                                                                    },

]
                                                                                
    
                
    
    

                         