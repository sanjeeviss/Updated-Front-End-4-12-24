export const inputpaymbankForm= [
    
    {
        name:"v_BankName",
        placeholder:"Enter V Bank Name ",
        label:"V Bank Name",
        variant:"outlined",
        fullWidth:true,
        required:true,
        
        xs:12,sm:12,
        },

        {
            name:"v_BankCode",
            placeholder:"Enter V Bank Code ",
            label:"V Bank Code",
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
                name:"Branch_Name",
                placeholder:"Enter Branch Name ",
                label:"Branch Name",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                },

                {
                    name:"Account_Type",
                    placeholder:"Enter Account Type ",
                    label:"Account Type",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12,
                    },

                    {
                        name:"Micr_Code",
                        placeholder:"Enter Micr Code ",
                        label:"Micr Code",
                        variant:"outlined",
                        fullWidth:true,
                        required:true,
                        
                        xs:12,sm:12,
                        },

                        {
                            name:"Ifsc_Code",
                            placeholder:"Enter Ifsc Code ",
                            label:"Ifsc Code",
                            variant:"outlined",
                            fullWidth:true,
                            required:true,
                            
                            xs:12,sm:12,
                            },

                            {
                                name:"Address",
                                placeholder:"Enter Address ",
                                label:"Address",
                                variant:"outlined",
                                fullWidth:true,
                                required:true,
                                
                                xs:12,sm:12,
                                },

                                {
                                    name:"others",
                                    placeholder:"Enter Others ",
                                    label:"Others",
                                    variant:"outlined",
                                    fullWidth:true,
                                    required:true,
                                    
                                    xs:12,sm:12,
                                    },

                    ]