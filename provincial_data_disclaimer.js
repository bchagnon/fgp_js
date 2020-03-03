// // var DEBUG = true;
window.addEventListener("load", function () {
	if (window.location.pathname.indexOf("/geonetwork/metadata/") > -1) {
	// if (window.location.pathname.indexOf("/test/") > -1) {
		var lang = document.documentElement.lang;
		// // DEBUG && console.log("lang = " + lang);

		var ulu = {
			"en": "Use Limitation",
			"fr": "Limitation d'utilisation"
		};
		var ogl = {
			"en": "Open Government Licence - ",
			"fr": "Licence du gouvernement ouvert - "
		};
		var govof = {
			"en": "Government of ",
			"fr": "Gouvernement de "
		};
		var provinces = [{
				"abbr": "ab",
				"en": [{
						"pfx": "",
						"name": "Alberta"
					}
				],
				"fr": [{
						"pfx": "l'",
						"name": "Alberta"
					}
				]
			}, {
				"abbr": "bc",
				"en": [{
						"pfx": "",
						"name": "British Columbia"
					}
				],
				"fr": [{
						"pfx": "la ",
						"name": "Colombie-Britannique"
					}
				]
			}, {
				"abbr": "nl",
				"en": [{
						"pfx": "",
						"name": "Newfoundland and Labrador"
					}
				],
				"fr": [{
						"pfx": "",
						"name": "Terre-Neuve-et-Labrador"
					}
				]
			}, {
				"abbr": "ns",
				"en": [{
						"pfx": "",
						"name": "Nova Scotia"
					}
				],
				"fr": [{
						"pfx": "la ",
						"name": "Nouvelle-Écosse"
					}
				]
			}, {
				"abbr": "on",
				"en": [{
						"pfx": "",
						"name": "Ontario"
					}
				],
				"fr": [{
						"pfx": "l'",
						"name": "Ontario"
					}
				]
			}, {
				"abbr": "pei",
				"en": [{
						"pfx": "",
						"name": "Prince Edward Island"
					}
				],
				"fr": [{
						"pfx": "l'",
						"name": "Île-du-Prince-Édouard"
					}
				]
			}
		];

		var len = provinces.length;
		// // DEBUG && console.log("Total provinces = " + len);

		// Get haystack string inside <main role="main" property="mainContentOfPage" class="container">
		var haystack = document.querySelector("main.container").innerText;
		// // DEBUG && console.log("haystack = " + haystack);

		for (var i = 0; i < len; i++) {
			// // DEBUG && console.log("- Search haystack for province " + (i+1));

			var province = provinces[i];
			// // DEBUG && console.log("province = " + (JSON.stringify(province, undefined, 2)));

			// var oglRegex = '/Use Limitation(.*)\n(.*\n)(.*\n)(.*)Open Government Licence - ' + province[lang] + '/g';
			/* var oglRegex = '/Open Government Licence - ' + province[lang] + '/g';
			DEBUG && console.log("oglRegex = " + oglRegex);
			var haystack = main.search(oglRegex) ? main.search(oglRegex) : '';
			DEBUG && console.log("haystack = " + haystack); */
			needle = ogl[lang] + province[lang][0].name;
			// // DEBUG && console.log("needle = " + needle);
			// // DEBUG && console.log("- Searching haystack for prov. " + (i + 1) + " : " + needle);

			const oglRegex = new RegExp(ulu[lang] + '.*\\n.*' + needle);
			// // DEBUG && console.log("oglRegex = " + oglRegex);

			const result = oglRegex.test(haystack);

			// if (haystack.indexOf(needle) >= 0) {
			// if (haystack.match(oglRegex)) {
			if (result) {
				// // DEBUG && console.log("+ Found " + province[lang][0].name + " in haystack!");
				var resourceNote = '<details class="alert alert-info" id="' + province.abbr + '-content" open="open">';
				resourceNote += '<summary class="h4"><h4>';
				if (lang === 'fr') {
					resourceNote += 'Rendus disponibles par l’entremise du ';
				} else {
					resourceNote += 'Made available by the ';
				}
				resourceNote += govof[lang] + province[lang][0].pfx + province[lang][0].name;
				resourceNote += '</h4></summary>';
				if (lang === 'fr') {
					resourceNote += '<p>Ces ressources ne sont pas contrôlées par le gouvernement du Canada, et l’hyperlien est fourni uniquement pour ';
					resourceNote += 'la facilité d’utilisation des visiteurs de notre site Web. Nous ne sommes pas responsables de l’exactitude, l’actualité ';
					resourceNote += 'et la fiabilité du contenu. Le gouvernement du Canada n’offre aucune garantie à cet égard et n’est pas responsable des ';
					resourceNote += 'renseignements trouvés par l’entremise de ce lien.</p>';
					resourceNote += '<p>Les visiteurs devraient également savoir que les renseignements offerts par l’entremise de ce site Web ne sont pas ';
					resourceNote += 'gérés par le gouvernement du Canada et ne relèvent pas de la <a href="http://laws-lois.justice.gc.ca/fra/lois/P-21/index.html">Loi ';
					resourceNote += 'sur la protection des renseignements personnels</a> ni de la <a href="http://laws-lois.justice.gc.ca/fra/lois/O-3.01/">Loi sur ';
					resourceNote += 'les langues officielles</a>, et qu’ils pourraient ne pas être accessibles aux personnes handicapées. Les renseignements offerts ';
					resourceNote += 'pourraient être uniquement disponibles dans la langue utilisée dans le site en question. En ce qui concerne la protection des ';
					resourceNote += 'renseignements personnels, les visiteurs devraient vérifier les politiques de confidentialité de ce site Web non gouvernemental ';
					resourceNote += 'avant de fournir leurs renseignements personnels.</p>';
				} else {
					resourceNote += '<p>These resources are not under the control of the Government of Canada and the link is provided solely for the ';
					resourceNote += 'convenience of our website visitors. We are not responsible for the accuracy, currency or reliability of the ';
					resourceNote += 'content of this website. The Government of Canada does not offer any guarantee in that regard and is not responsible ';
					resourceNote += 'for the information found through this link.</p>';
					resourceNote += '<p>Visitors should also be aware that information offered by this non-Government of Canada site is not subject to the ';
					resourceNote += '<a href="http://laws-lois.justice.gc.ca/eng/acts/P-21/index.html">Privacy Act</a> or the ';
					resourceNote += '<a href="http://laws-lois.justice.gc.ca/eng/acts/O-3.01/">Official Languages Act</a> and may not be accessible to ';
					resourceNote += 'persons with disabilities. The information offered may be available only in the language used by the site. With respect ';
					resourceNote += 'to privacy, visitors should research the privacy policies of this non-government website before providing personal ';
					resourceNote += 'information.</p>';
				}
				resourceNote += '</details>';
				Element.prototype.appendAfter = function (element) {
					element.parentNode.insertBefore(this, element.nextSibling);
				},
				false;
				var NewElement = document.createElement('section');
				NewElement.id = 'resourceNote';
				NewElement.className = 'mrgn-tp-md';
				NewElement.innerHTML = resourceNote;
				NewElement.appendAfter(document.getElementsByClassName('ec-abstract')[0]);
				break;
			} else {
				// // DEBUG && console.log("Needle found in Haystack = NO");
			}
			// DEBUG && console.log("End loop");
		}

	}
})
