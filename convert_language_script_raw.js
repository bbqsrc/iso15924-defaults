// https://raw.githubusercontent.com/unicode-org/cldr/master/tools/java/org/unicode/cldr/util/data/language_script_raw.txt

const fs = require("fs")

function convert() {
    const langs = fs.readFileSync("./language_script_raw.txt", "utf8").trim().split("\n").slice(1)
    const out = []
    for (const lang of langs) {
        const [tag, name, primacy, script] = lang.split("\t")

        if (primacy != "primary") {
            continue
        }

        if (tag.length === 3) {
            out.push([tag, "", script, "", "", "cldr"])
        } else {
            out.push(["", tag, script, "", "", "cldr"])
        }
    }
    out.sort((a, b) => {
        const x = a[0] || a[1]
        const y = b[0] || b[1]

        return x > y ? 1 : -1
    })
    console.log("tag3\ttag1\tscript\tregion\tlcid\tsource")
    for (const item of out) {
        console.log(item.join('\t'))
    }
}

convert()