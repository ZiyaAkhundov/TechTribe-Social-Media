import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { createContact } from "../../services/Contact"
import { toast } from "react-toastify";

export default function contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const[disable,setDisable] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    setDisable(true)
    const response = await createContact({name,email,message});
    if(response.status == "success"){
      setDisable(false)
      toast.success(response.message)
      setName('');setEmail('');setMessage('')
    }
  };
  return (
    <div className='contact-container overflow-auto'>
      <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography variant="h4" align="center" mb={2}>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button variant="contained" disabled={disable} type="submit" sx={{ mt: 2 }} className={`${disable ? 'opacity-60': null}`}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
    </div>
  )
}
