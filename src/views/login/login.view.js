import { Button, Fade, TextField, ThemeProvider, createTheme } from "@mui/material";
import './login.style.css'
import useLogin from "../../hooks/useLogin";

const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', // Color del borde
              },
              '&:hover fieldset': {
                borderColor: 'white', // Color del borde cuando se está sobre él
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // Color del borde cuando está enfocado
              },
            },
            '& .MuiOutlinedInput-input': {
              color: 'white', // Color del texto
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Color del label
            },
            '& .MuiFormLabel-root.Mui-focused': {
              color: 'white', // Color del label cuando está enfocado
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white', // Color del borde del label
            },
          },
        },
      },
    },
});

export default function LoginView (){

    const {
      form, 
      onChangeForm, 
      onSubmit,
      formVisible,
      logoVisible
    } = useLogin()

    return (
        <ThemeProvider theme={theme}>
        <main className="login-container">
          <Fade in = {formVisible} timeout={1000}>
            <section className="login-card">
                <form className="login-form" onSubmit={onSubmit}>
                  <h2>Iniciar Sesión</h2>
                    Ingresa tus credenciales para iniciar sesión
                    <TextField
                        name="email"
                        value={form.email}
                        onChange={onChangeForm}
                        autoComplete="off"
                        label = "Correo electrónico"
                        variant="outlined"
                    />
                    <TextField
                        name="password"
                        value={form.password}
                        onChange={onChangeForm}
                        autoComplete="off"
                        label = "Contraseña"
                        variant="outlined"
                        type="password"
                    />
                    <Button variant="contained" color="success" type="submit">Ingresar</Button>
                </form>
            </section>
          </Fade>
          <Fade in = {logoVisible} timeout={1000}>
            <section className="login-logo">
                <img src="https://media.licdn.com/dms/image/C4E03AQEwJr2wnPLIUA/profile-displayphoto-shrink_800_800/0/1614872068950?e=2147483647&v=beta&t=M0udL8_Q82NynkwQ4EbjfsSk8fPMR5pLd5LqQZ3exio"/>
            </section>
          </Fade>
        </main>
        </ThemeProvider>
    )
}