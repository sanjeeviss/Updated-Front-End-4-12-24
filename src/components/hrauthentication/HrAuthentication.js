export const inputFormHrAuthentication= [
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
                name:"SectionId",
                placeholder:"Enter Section Id ",
                label:"Section Id",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12,
                
                
                },
               {
                name:"SectionView",
                placeholder:"Enter Section View ",
                label:"Section View",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12
            },
            {
                name:"SectionEdit",
                placeholder:"Enter Section Edit ",
                label:"Section Edit",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12
            },
            {
                name:"SectionDelete",
                placeholder:"Enter Section Delete ",
                label:"Section Delete",
                variant:"outlined",
                fullWidth:true,
                required:true,
                
                xs:12,sm:12
            }
           
        ]