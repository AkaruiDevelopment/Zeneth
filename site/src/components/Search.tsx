import { Autocomplete, TextField,createTheme,ThemeProvider } from "@mui/material";


const Search = () => {
  const theme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={theme}>
        <Autocomplete
            options={[]}
            renderInput={(params) => <TextField {...params} label="Search" />}
            sx={{
                color: "white",
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "white",
                        color: "white",
                    },
                    "&:hover fieldset": {
                        borderColor: "white",
                        color: "white",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "white",
                        color: "white",
                    },
                },
                width: "100%",
                maxWidth: "200px"
            }}
        />
        </ThemeProvider>
    );
};

export default Search;
