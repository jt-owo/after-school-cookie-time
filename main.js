function e(e, r) { const t = null === r[0]; let o = new RegExp(""); null !== r[0] && (o = "string" == typeof r[0] ? new RegExp(r[0].replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g") : r[0], o.test(e) || console.warn("Nothing to inject.")); const n = /(\)[^{]*{)/, c = /(}?)$/; switch (r[2]) { case "before": e = t ? e.replace(n, `$1${r[1]}`) : e.replace(o, `${r[1]}${r[0]}`); break; case "replace": e = t ? r[1] : e.replace(o, r[1]); break; case "after": e = t ? e.replace(c, `${r[1]}$1`) : e.replace(o, `${r[0]}${r[1]}`); break; default: throw new Error('where Parameter must be "before", "replace" or "after"') }return e } function injectCodes(r, t, o = {}) { let n = r.toString(); for (const r of t) n = e(n, r); const c = Function(...Object.keys(o), `return (${n})`)(...Object.values(o)); return c.prototype = r.prototype, c }

if (!AfterSchoolCookieTime) var AfterSchoolCookieTime = {
    name: 'AfterSchoolCookieTime',
    version: '1.0',
    isLoaded: false,

    init: function () {
        // Cookie replacements.
        Game.Loader.Replace('perfectCookie.png', this.dir + '/mugi_cookie.png');
        
        // TODO: Maybe add seasonal specific sprites.
        switch (Game.baseSeason) {
            default:
                Game.Loader.Replace('goldCookie.png', this.dir + '/mugi_goldCookie.png');
                Game.shimmerTypes.golden.initFunc = injectCodes(
                    Game.shimmerTypes.golden.initFunc,
                    [
                        ['img/goldCookie.png', `"${this.dir}/mugi_goldCookie.png"`, 'replace'],
                    ]
                );
        }

        Game.Loader.Replace('wrathCookie.png', this.dir + '/mugi_wrathCookie.png');
        Game.shimmerTypes.golden.initFunc = injectCodes(
            Game.shimmerTypes.golden.initFunc,
            [
                ['img/wrathCookie.png', `"${this.dir}/mugi_wrathCookie.png"`, 'replace'],
            ]
        );

        // Wrinkler replacements.
        // TODO: maybe add more K-ON! characters as wrinklers.
        // TOD: ADd special wrinkler variants
        Game.Loader.Replace('wrinkler.png', this.dir + '/mugi_wrinkler.png');
        Game.Loader.Replace('winterWrinkler.png', this.dir + '/mugi_wrinkler.png');
        Game.Loader.Replace('shinyWrinkler.png', this.dir + '/mugi_wrinkler.png');

        // FIXME: wrinklers googlies are empty at the moment :(
        Game.Loader.Replace('wrinklerBlink.png', this.dir + '/mugi_wrinklerBlink.png')
        Game.Loader.Replace('wrinklerGooglies.png', this.dir + '/mugi_wrinklerGooglies.png')
        // TODO: Bocchi wrinkler shadows could look better.
        Game.Loader.Replace('wrinklerShadow.png', this.dir + '/mugi_wrinklerShadow.png');

        Game.Notify(`After School Cookie Time! is ready`, 'You can now give some headpats.', [0, 0, this.dir + '/icon.png'], 7);
        this.isLoaded = true;

        // TODO: Add options menu without relying on CCSE.
    },

    register: function () {
        Game.registerMod(this.name, this);
    },
}

// Load mod if mod wasn't lodaed anytime before. SHOULD NEVER BE THE CASE!
if (!AfterSchoolCookieTime.isLoaded) {
    AfterSchoolCookieTime.register();
}