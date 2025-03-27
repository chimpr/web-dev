import { Button } from "@mui/material";

export default function InputFileUpload(props: any) {
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        console.log(file);
        // Handle the file upload logic here
    };

    return (
        <div>
            <input
                accept={props.FileType}
                style={{ display: 'none' }}
                id={props.id}
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor={props.id}>
                <Button variant="contained" component="span">
                    {props.text}
                </Button>
            </label>
        </div>
    );
    
}