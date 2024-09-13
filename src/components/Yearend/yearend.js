export const inputFormElements = [

    
    {
        name: "StartDate",
        variant: "outlined", 
        fullWidth: true, 
        required: true, 
        label:"Start Date",
        xs:12, 
        sm:12,
        type:"date",
        InputProps: {
            shrink: true

        },
        
        
    },
    {
        name: "EndDate",
        variant: "outlined", 
        fullWidth: true, 
        required: true, 
        label: "Enddate",
        xs:12, 
        sm:12,

        type:"date",
        inputprops: {
            shrink: true
        }
    },
    {
        name: "process",
        variant: "outlined", 
        fullWidth: true, 
        label: "processDate",
        required: true, 
        xs:12, 
        sm:12,
        type:"date",
        inputprops: {
            shrink: true
        }
    }


]


