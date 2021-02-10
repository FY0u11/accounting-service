import { useState } from 'react'
import RU from '../localization/ru'

export const useLanguage = () => {
  const [lang, setLang] = useState(RU)
  return { lang, setLang }
}
