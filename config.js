import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import chalk from 'chalk'
import fs from 'fs'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
import NodeCache from 'node-cache'

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
const moduleCache = new NodeCache({ stdTTL: 300 });

/*⭑⭒━━━✦❘༻☾⋆⁺₊✧𝛧𝚵𝐘𝐍𝐎✧₊⁺⋆☽༺❘✦━━━⭒⭑*/

global.sam = ['393501989497'];
global.owner = [
  ['393501989497', 'endy', true],
  ['212693877842', 'medalis', true],
  ['77787623522', 'ksav', true],
  ['254790385731', 'zak', true],
  ['393930950280', 'francy', true]
];

global.mods = ['xxxxxxxxxxx', 'xxxxxxxxxxx', 'xxxxxxxxxxx']
global.prems = ['xxxxxxxxxxx', 'xxxxxxxxxxx', 'xxxxxxxxxxx']

/*⭑⭒━━━✦❘༻🩸 INFO BOT 🕊️༺❘✦━━━⭒⭑*/

global.nomepack = '𝛧𝚵𝐘𝐍𝐎'
global.nomebot = '𝛧𝚵𝐘𝐍𝐎'
global.wm = '𝛧𝚵𝐘𝐍𝐎'
global.autore = 'ENDY'
global.dev = 'ENDY'
global.testobot = `𝛧𝚵𝐘𝐍𝐎`
global.versione = pkg.version
global.errore = '*ERRORE INATTESO*, UTILIZZA IL COMANDO .segnala (errore) per contattare lo sviluppatore. contatto diretto:+39 350 198 9497'

/*⭑⭒━━━✦❘༻🌐 LINK 🌐༺❘✦━━━⭒⭑*/

global.repobot ='https://wa.me/393501989497'
global.gruppo = 'https://chat.whatsapp.com/FdA61ZKYPB43WOIK6rUs8L?s=cl&p=a&mlu=3'
global.insta = 'https://www.instagram.com/Endy.2011_'

/*⭑⭒━━━✦❘༻ MODULI ༺❘✦━━━⭒⭑*/

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

/*⭑⭒━━━✦❘🗝️ API KEYS 🌍༺❘✦━━━⭒⭑*/

global.APIKeys = { 
    spotifyclientid: 'varebot',
    spotifysecret: 'varebot',
    browserless: 'varebot',
    screenshotone: 'varebot',
    screenshotone_default: 'varebot',
    tmdb: 'varebot',
    gemini: 'varebot',
    ocrspace: 'varebot', // Anche qui, se vuoi usare l'OCR, servirà una chiave reale
    assemblyai: '28d98ad404514d05ad203723e089eb63', // <--- AGGIORNATA QUI
    google: 'varebot',
    googlex: 'varebot',
    googleCX: 'varebot',
    genius: 'varebot',
    unsplash: 'varebot',
    removebg: 'FEx4CYmYN1QRQWD1mbZp87jV',
    openrouter: 'varebot',
    lastfm: '36f859a1fc4121e7f0e931806507d5f9',
    sightengine_user: 'varebot',
    sightengine_secret: 'varebot'
};



/*⭑⭒━━━✦❘༻🪷 SISTEMA XP/EURO 💸༺❘✦━━━⭒⭑*/

global.multiplier = 1 

/*⭑⭒━━━✦❘༻📦 RELOAD 📦༺❘✦━━━⭒⭑*/

let filePath = fileURLToPath(import.meta.url)
let fileUrl = pathToFileURL(filePath).href
const reloadConfig = async () => {
  unwatchFile(filePath)
  console.log(chalk.bgHex('#3b0d95')(chalk.white.bold("File: 'config.js' Aggiornato")))
  const module = await import(`${fileUrl}?update=${Date.now()}`)
  return module;
}
watchFile(filePath, reloadConfig)