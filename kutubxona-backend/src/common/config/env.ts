import {config} from 'dotenv'
config()
export const configration = {
    PORT:Number(process.env.PORT),
    POSTGRES_USER:process.env.POSTGRES_USER,
    POSTGRES_DB:process.env.POSTGRES_DB,
    POSTGRES_HOST:process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD:process.env.POSTGRES_PASSWORD,
    POSTGRES_PORT:Number(process.env.POSTGRES_PORT),
    KUTUBXONACHI_LOGINI:process.env.KUTUBXONACHI_LOGINI,
    KUTUBXONACHI_PAROLI:process.env.KUTUBXONACHI_PAROLI,
    USTOZ_LOGINI:process.env.USTOZ_LOGINI,
    USTOZ_PAROLI:process.env.USTOZ_PAROLI
}


// PORT=3000
// POSTGRES_PASSWORD=maestro@Nurillo
// POSTGRES_USER=postgres
// POSTGRES_DB=kutubxona
// POSTGRES_HOST=localhost
// POSTGRES_PORT=5432
// KUTUBXONACHI_LOGINI=javohir
// KUTUBXONACHI_PAROLI=6a5x48s
// USTOZ_LOGINI=sarvar
// USTOZ_PAROLI=2A5s6a5