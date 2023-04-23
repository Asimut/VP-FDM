importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'); 

var CACHE_VERSION = 3;
var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-vp-fdm-v' + CACHE_VERSION
};

//Page Link Example:
//https://asimut.github.io/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/index.html
var pageLink = 'https://asimut.github.io/VP-FDM/';

workbox.setConfig({ debug: true });

self.addEventListener('install', function(event) {
  let ok,
    libjs = ['player-0.0.11.min', 'main.bundle', 'lzwcompress'],
    libcss = ['main.bundle', 'icomoon'],
    libfonts = ['icomoon', 'Lato-Black', 'Lato-Bold', 'Lato-Italic', 'Lato-Light', 'Lato-Regular'],
    assetsvideo =[
      '1ibb9yR4wtMGbKcg_transcoded-cyqlI9DTLppcN8Vk-torso',
      '2-HJY4zXoy6VYaV6_transcoded-6iZM7VOHmGoVJ7qg-lips',
      '5EjP3jAWnusJfe_P_transcoded-Ej_YvFp67do0WgIJ-Sue_6Weeks',
      '7lQp0fV6GPMSAsjg_transcoded-t9PVyavmR7KoJT-W-Jane_6Weeks',
      'BeXSv-jznpFVvMVV_transcoded-WrsXiZUS_HBNp3RL-Sue_48Weeks',
      'cO9JIaBOoZOrCX2x_transcoded-p3ZW65hnn88TuGUm-Jane_48Weeks',
      'DIgUA3RtzOGxR3qX_transcoded-kd_IwTb56uWFyUbl-Ed_Baseline',
      'dlhEad_s_q0qUT0o_transcoded-6F-kinz-Um3SBb7u-Gloria_Baseline',
      'dSM9f44gBKW5s-KH_transcoded--p-K0T8ihC0O0NHv-Ed_8Weeks',
      'dx92T3gWmR_gN84A_transcoded-rYO1lHqrO4rTMrlo-Martin_6Weeks',
      'GdLUGjaxyxacf06k_transcoded-LalaPRKzNnds7fOX-lower-limbs',
      'GhofPZGPw3j2ppZP_transcoded-EIG8-_2SuQtTgoae-Sue_Baseline',
      'N0p5kWEHlpdx9bnD_transcoded-QDqKCPlPruDgXj5--Gloria_2Weeks',
      'sBXzSJPGQ-siVWnV_transcoded-rJfHogn6SIOhVT3v-Jane_Baseline',
      'uCBxKVVGyo2hcb2M_transcoded-cuFpRjmcAvLPRgBF-Martin_Baseline',
      'WK3EGpad9fasKqJ-_transcoded-LvBEHhN3GT1Cnf8U-Gloria_6Weeks',
      'yd379TjTQ3T7qCOl_transcoded-eZ9E531W2YCH-5Jd-upper-limbs'
    ],
    assetssvg = [
      '4nKF3-4-YtvIJBe9_GEJmaWhVU7yhIAU-',
      'A4-Ci_HOrkryGNs__nNF_8JAH3JQIy4C3',
      'AcRGevt18wz7gE1d_ZV9sVhdLLPr5_C8F',
      'b00zI558dK89diwW_pUKlA_ZN5HnDD-9s',
      'EhIaRAosZ54nDgN4_ykYH-2sOuLlt3xBh',
      'emG0Yp_NX8yzPV99_oIvQVO0kU3JbZteJ',
      'eReURFaZY5dWGjCW_sDS_9D364hA2SlJ-',
      'hjiq8KaxApNoMkxp_87lR_1YbKaT0xj89',
      'IIKdA7a6tgl9Uyaq_GpzbeCJLaV67eZ1P',
      'kwkddkjUgn-mhXqG_1u5jkIIq4niuBhVo',
      'L8wjag6DobrRN6NI_ZPmBKRlu0OrtPMw2',
      'mntHrxyGeg9OS6YK_C88oIjnBMA5EDKh6',
      'MzPGmGRBLCrNpXTv_-n9YNqPAl_oHkUcM',
      'N4IJhA3SljuKcc-x_OrQX187Z-zJRRNYT',
      'NAvvP27PflKftgpO_l4DwlC6Zyzh7p3yI',
      'QdQZDZBe0yhxGhB5_eBNFJIOYzNOhWZYQ',
      'qPw3jPE9dAZU0wzx_p5OCBEEwEmLb_bEs',
      'XX2J5y-ZjAJTZAgX_9_OaSN0gZxqw1dV1'
    ],
    assetspng = [
      '6iY_85PTKbs-1vrC_YTyU0bPGcgSPuqVN',
      '9IRCw_aDN3S6ps_F_Q_E9xlPksi9HxuVl',
      '26K98zAP8ni-jhbW_e_xujU5j_OLzuM4p',
      'b5v9dl2orbscBUL4_transcoded-EIG8-_2SuQtTgoae-Sue_Baseline-00001',
      'bJLsk_MPV_qZZqua_N1-UfLnIhcQWsJBy',
      'bNpVw0NEeZv7ntvW_LtxkH4s7Nriha1gg',
      'c0EF6ZXXsfjj7kos_transcoded--p-K0T8ihC0O0NHv-Ed_8Weeks-00001',
      'F0USKlz8_LjpyUM2_transcoded-rJfHogn6SIOhVT3v-Jane_Baseline-00001',
      'f4Btu2VfuvddHe8B_Q0fKDZtYxc315r7W',
      'fIk3Y3rwAtG2ixWi_transcoded-t9PVyavmR7KoJT-W-Jane_6Weeks-00001',
      'FNeSSgmiSbhSwshQ_transcoded-rYO1lHqrO4rTMrlo-Martin_6Weeks-00001',
      'fzGb7Fj7FiPLhw4U_J_FVNfk8t0zWFs9F',
      'hXKZh_2yTE22_ofq_WnekF07yXWhl1HI_',
      'IAhFAe-4ApT5dex8_transcoded-cuFpRjmcAvLPRgBF-Martin_Baseline-00001',
      'IBWGWwWv1FXFc8nq_small',
      'ifA1TqyUNqgcbFeN_KEzpUfBEn0Az1Ge-',
      'j3ubB3qajaAmAgsw_ZS0Y6uc5n2amivaW',
      'kuP7252FD0_20_pe_Sz_vyJhC9P2kae6N',
      'KwIU5ljzo1r45BHz_6IZvN3VbvJfZuVSv',
      'L9NCpMZoMEPIhFEq_hqZ8CPfolZhlRpSn',
      'MAd2KKAfB89pm8Zh_j0QP4VpqpRUbq5Ez',
      'miRxrR-TE2Rssgb6_P1c5WYGq3jg-mCNZ',
      'mUQWp1GRJpcKG5GZ_transcoded-6F-kinz-Um3SBb7u-Gloria_Baseline-00001',
      'MX7zJneHvLxNRApW_small_1579124541',
      'nb1K4pzzPfUZu7PI_transcoded-eZ9E531W2YCH-5Jd-upper-limbs-00001',
      'NmK85N6gHZdJ0b5Q_uFTveUW5EV5h6MiN',
      'NnCyo_YzMAYjx40A__BsaZtftMR_j3ky5',
      'NsSPrL6AljsdQFGB_eg2U9dbqW5iiA1gu',
      'OaGJ7GiOWRBALRQ1_yIdL-BBIeA0LWkXH',
      'OI0J16k7lQ0e-Go1_transcoded-Ej_YvFp67do0WgIJ-Sue_6Weeks-00001',
      'OkFAnbCBftHjX5T7_yjZQLNQnL37VJ8Ca',
      'OkFaoYBt9J9JuKhT_3wcDpAmAcE2Xyp7a',
      'qrBVPuuSPe998m5y_MnbOxGzPiF0rgjfF',
      'reGDTR3ie2CnKGU7_transcoded-6iZM7VOHmGoVJ7qg-lips-00001',
      'ROTMrz_H_vT71GlT_uh4dqE7zsUI2r1wB',
      'RxfWW8snDZwuFbYd_transcoded-p3ZW65hnn88TuGUm-Jane_48Weeks-00001',
      'rY7mLJpMsDwHk36V_zZq-bPMAXR15ya9M',
      'SlloWS8FjnjptH47_d9U3AKfdex_kRXGd',
      'spWR18tpfHKCqeen_transcoded-LvBEHhN3GT1Cnf8U-Gloria_6Weeks-00001',
      'TocqJ0vb93AFPCYx_transcoded-LalaPRKzNnds7fOX-lower-limbs-00001',
      'VAjxIZZhzfXpU5sh_transcoded-QDqKCPlPruDgXj5--Gloria_2Weeks-00001',
      'VNFV_n2uctra3j8s_rirvyWZ-Z8H5N5WU',
      'We-dyxhu9DC9e3un_00iaS05tFptaeCbk',
      'weI2XJyathBZN7Ev_mYWpiGscet6aDTb7',
      'XCXtJWq8w6Yq_lSV_mUC3DORyoD6E4WAi',
      'xe3wXUeTDTwoZo2L_transcoded-WrsXiZUS_HBNp3RL-Sue_48Weeks-00001',
      'XGQ0f30cw7Qgtpnj_Mz2l7axu4bYxv3M6',
      'XGqlCuPLDrUqkI10_AUzSH8jT4xFyfcYF',
      'Xu7IkBI9nRuwRLfn_rbbCcjDvWWgedPLb',
      'XubqiJ8oJkVYiN6O_G5c__lWMeoUcW8eJ',
      'XzR1mo4TMLBbds-k_transcoded-kd_IwTb56uWFyUbl-Ed_Baseline-00001',
      'YBZyF3cqXum2Fx9e_transcoded-cyqlI9DTLppcN8Vk-torso-00001'
    ],
    assetsjpg = [
      'broytZZMTEgiBQ4O_4_cities',
      'Griwa6LqpcBFEzB7_example-header-image',
      'ZsnuZqnPo5MbPc49_quote_background'
    ],
    assetspdf = [
      'epds3obDrXRH7jAZ_LUi5YO0ctCiLxyfK-Full Prescribing Information',
      'mPxzA3CmJSx-fRUr_pSQRJWXMj0UNOWMg-INGREZZA-Full-Prescribing-Information'
    ];
  var urlsToPrefetch = [
      pageLink,
      pageLink+'index.html',
      ...libjs.map(i => pageLink+'lib/' + i + '.js'),
      ...libcss.map(i => pageLink+'lib/' + i + '.css'),
      ...libfonts.map(i => pageLink+'lib/fonts/' + i + '.woff'),
      pageLink+'lib/fonts/icomoon.ttf',
      pageLink+'assets/custom/jquery-3.6.0.min.js',
      pageLink+'assets/custom/script.js',
      pageLink+'assets/custom/style.css',
      pageLink+'assets/custom/arrow_down.png',
      pageLink+'assets/custom/chat.svg',
      pageLink+'assets/custom/check.svg',
      pageLink+'assets/custom/cover_logo.png',
      pageLink+'assets/custom/down-arrow.svg',
      pageLink+'assets/custom/ingrezza-valbenazine-logo-n.svg',
      pageLink+'assets/custom/logo-modal.png',
      pageLink+'assets/custom/open-book.svg',
      ...assetsvideo.map(i => pageLink+'assets/' + i + '.mp4?v=1'),
      ...assetssvg.map(i => pageLink+'assets/' + i + '.svg'),
      ...assetspng.map(i => pageLink+'assets/' + i + '.png'),
      ...assetsjpg.map(i => pageLink+'assets/' + i + '.jpg'),
      ...assetspdf.map(i => pageLink+'assets/' + i + '.pdf'),
      pageLink+'pwabuilder-sw.js',
      pageLink+'manifest.json',
      pageLink+'152.png',
      pageLink+'144.png',
      pageLink+'64.png',
      pageLink+'32.png',
      pageLink+'android-launchericon-512-512.png'
  ];

  // All of these logging statements should be visible via the "Inspect" interface
  // for the relevant SW accessed via chrome://serviceworker-internals
  console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);

  // self.skipWaiting();

  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then(async (cache) => {
      return cache.addAll(urlsToPrefetch);      
    }).then(() => {
      console.log('All files were successfully cached.');

      caches.open(CURRENT_CACHES.prefetch).then(cache => {
        cache.keys()
        .then(requests => console.log(requests))
      })

      self.skipWaiting();
    })
  );

});

self.addEventListener('activate', function(event) {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // if (expectedCacheNames.indexOf(cacheName) === -1) {
          //   // If this cache name isn't present in the array of "expected" cache names, then delete it.
          //   console.log('Deleting out of date cache:', cacheName);
          //   return caches.delete(cacheName);
          // }
        })
        );
    })
    );    
});

self.addEventListener('fetch', function(event) {
  
  headersLog = [];
  for (var pair of event.request.headers.entries()) {
    console.log(pair[0]+ ': '+ pair[1]);
    headersLog.push(pair[0]+ ': '+ pair[1])
 }
 console.log('Handling fetch event for', event.request.url, JSON.stringify(headersLog));

  if (event.request.headers.get('range')) {
    console.log('Range request for', event.request.url);
    var rangeHeader=event.request.headers.get('range');
    var rangeMatch =rangeHeader.match(/^bytes\=(\d+)\-(\d+)?/)
    var pos =Number(rangeMatch[1]);
    var pos2=rangeMatch[2];
    if (pos2) { pos2=Number(pos2); }
    
    console.log('Range request for '+ event.request.url,'Range: '+rangeHeader, "Parsed as: "+pos+"-"+pos2);
    event.respondWith(
      caches.open(CURRENT_CACHES.prefetch)
      .then(function(cache) {
        return cache.match(event.request.url);
      }).then(function(res) {
        if (!res) {
          console.log("Not found in cache - doing fetch")
          return fetch(event.request)
          .then(res => {
            console.log("Fetch done - returning response ",res)
            return res.arrayBuffer();
          });
        }
        console.log("FOUND in cache - doing fetch")
        return res.arrayBuffer();
      }).then(function(ab) {
        console.log("Response procssing")
        let responseHeaders=  {
          status: 206,
          statusText: 'Partial Content',
          headers: [
            ['Content-Type', 'video/mp4'],
            ['Content-Range', 'bytes ' + pos + '-' + 
            (pos2||(ab.byteLength - 1)) + '/' + ab.byteLength]]
        };
        
        console.log("Response: ",JSON.stringify(responseHeaders))
        var abSliced={};
        if (pos2>0){
          abSliced=ab.slice(pos,pos2+1);
        }else{
          abSliced=ab.slice(pos);
        }
        
        console.log("Response length: ",abSliced.byteLength)
        return new Response(
          abSliced,responseHeaders
        );
      }));
  } else {
    console.log('Non-range request for', event.request.url);
    event.respondWith(
    // caches.match() will look for a cache entry in all of the caches available to the service worker.
    // It's an alternative to first opening a specific named cache and then matching on that.
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found response in cache:', response);
        return response;
      }
      console.log('No response found in cache. About to fetch from network...');
      // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
      // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
      return fetch(event.request).then(function(response) {
        console.log('Response from network is:', response);

        return response;
      }).catch(function(error) {
        // This catch() will handle exceptions thrown from the fetch() operation.
        // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
        // It will return a normal response object that has the appropriate error code set.
        console.error('Fetching failed:', error);

        throw error;
      });
    })
    );
  }
});
