import messages from '../i18n.js';

export const SITE_URL = 'https://www.fengfengfeng.com';
export const SUPPORTED_LANGUAGES = ['zh', 'en', 'de', 'fr', 'ja', 'ko'];

const languageDetails = {
  zh: {
    htmlLang: 'zh-CN',
    locale: 'zh_CN',
    keywords: '船用发动机气门,船用阀座,船用阀杆,柴油机配件,MAN B&W气门,Wartsila气门,镇江舰海船舶配件',
  },
  en: {
    htmlLang: 'en',
    locale: 'en_US',
    keywords: 'marine engine valves,marine valves,valve seats,valve spindles,marine diesel engine parts,MAN B&W valves,Wartsila valves,Jianhai Marine Parts',
  },
  de: {
    htmlLang: 'de',
    locale: 'de_DE',
    keywords: 'Schiffsmotorventile,Schiffsventile,Ventilsitze,Ventilspindeln,Schiffsdieselmotor-Ersatzteile,MAN B&W Ventile,Wärtsilä Ventile,Jianhai Schiffsteile',
  },
  fr: {
    htmlLang: 'fr',
    locale: 'fr_FR',
    keywords: 'soupapes moteur marin,soupapes marines,sièges de soupape,tiges de soupape,pièces moteur diesel marin,soupapes MAN B&W,soupapes Wärtsilä,Jianhai Marine Parts',
  },
  ja: {
    htmlLang: 'ja',
    locale: 'ja_JP',
    keywords: '船舶用エンジンバルブ,バルブシート,バルブスピンドル,舶用ディーゼルエンジン部品,MAN B&W,Wartsila,鎮江艦海',
  },
  ko: {
    htmlLang: 'ko',
    locale: 'ko_KR',
    keywords: '선박 엔진 밸브,밸브 시트,밸브 스핀들,선박 디젤 엔진 부품,MAN B&W 밸브,Wartsila 밸브,전장 젠하이',
  },
};

export const normalizeLanguage = (language, fallback = 'en') => {
  const normalized = String(language || '').toLowerCase().split(/[-_]/)[0];
  return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : fallback;
};

export const getSeoData = (language) => {
  const languageCode = normalizeLanguage(language);
  const dictionary = messages[languageCode] ?? messages.en;

  return {
    language: languageCode,
    title: dictionary.title,
    description: dictionary.description,
    companyName: dictionary.footer_company,
    address: dictionary.contact_address,
    ...languageDetails[languageCode],
  };
};

export const getLanguagePath = (language) => `/${normalizeLanguage(language)}/`;
export const getLanguageUrl = (language) => `${SITE_URL}${getLanguagePath(language)}`;

export const createStructuredData = (language) => {
  const seo = getSeoData(language);
  const dictionary = messages[seo.language];
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: seo.companyName,
        alternateName: 'Zhenjiang Jianhai Marine Parts Co., Ltd.',
        url: getLanguageUrl(seo.language),
        image: `${SITE_URL}/assets/jianhai-marine-parts.jpg`,
        telephone: ['+86 139 5201 1890', '+86 139 5179 0128', '+86 138 5194 3971'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: seo.address,
          addressCountry: 'CN',
        },
        knowsAbout: [
          'Marine engine intake and exhaust valves',
          'Marine engine valve seats',
          'Marine engine valve spindles',
          'Marine diesel engine parts',
          'OEM and drawing-based manufacturing',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: seo.companyName,
        publisher: { '@id': organizationId },
        inLanguage: SUPPORTED_LANGUAGES.map((code) => getSeoData(code).htmlLang),
      },
      {
        '@type': 'WebPage',
        '@id': `${getLanguageUrl(seo.language)}#webpage`,
        url: getLanguageUrl(seo.language),
        name: seo.title,
        description: seo.description,
        inLanguage: seo.htmlLang,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
      },
      {
        '@type': 'FAQPage',
        '@id': `${getLanguageUrl(seo.language)}#faq`,
        inLanguage: seo.htmlLang,
        mainEntity: [1, 2, 3, 4, 5, 6].map((number) => ({
          '@type': 'Question',
          name: dictionary[`faq_q${number}`],
          acceptedAnswer: {
            '@type': 'Answer',
            text: dictionary[`faq_a${number}`],
          },
        })),
      },
    ],
  };
};
