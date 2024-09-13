export const inputpaymEmployeeWorkDetailsForm= [
    
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
                    name:"JoiningDate",
                    label:"Joining Date",
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
                    name:"OfferDate",
                    label:"Offer Date",
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
                    name:"ProbationUpto",
                    label:"Probation Upto",
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
                    name:"ExtendedUpto",
                    label:"Extended Upto",
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
                    name:"ConfirmationDate",
                    label:"Confirmation Date",
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
                    name:"RetirementDate",
                    label:"Retirement Date",
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
                    name:"ContractRenviewDate",
                    label:"ContractRenview Date",
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
                    name:"v_Reason",
                    placeholder:"V Reason",
                    label:"V Reason",
                    variant:"outlined",
                    fullWidth:true,
                    required:true,
                    
                    xs:12,sm:12,
                    
                    },

                                    
                
                    ]