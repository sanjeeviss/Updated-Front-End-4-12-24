export const inputpaymHolidayForm= [
    
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
           
           
            },
            {
                name:"pn_Holidaycode",
                placeholder:"pn Holiday Code ",
                label:"pn Holiday Code",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                },

                {
                    name:"pn_Holidayname",
                    placeholder:"pn Holiday Name  ",
                    label:"pn Holiday Name",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12,
                    
                    },

                    {
                        name:"Fyear",
                        placeholder:"Fyear ",
                        label:"Fyear",
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
                            name:"days",
                            placeholder:"Days",
                            label:"Days",
                            variant:"outlined",
                            fullWidth:true,
                            required:true,
                            
                            xs:12,sm:12,
                            
                            },

                ]

                   