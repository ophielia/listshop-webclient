// Run with Node 24. Fetch primary npm metadata; do not modify dependencies.
const fs = require('node:fs');
const semver = require('semver');
const packages = ['@angular/cdk', 'primeng', '@ng-bootstrap/ng-bootstrap',
  'ngx-logger', 'ngx-owl-carousel-o', 'ngx-page-scroll', 'ngx-page-scroll-core', 'ngx-spinner'];

async function metadata(name) {
  const response = await fetch('https://registry.npmjs.org/' + encodeURIComponent(name));
  if (!response.ok) throw new Error(name + ': HTTP ' + response.status);
  return response.json();
}

(async () => {
  const core = await metadata('@angular/core');
  const records = await Promise.all(packages.map(metadata));
  const lines = ['# Dependency compatibility candidates', '',
    'Generated from npm registry metadata by `scripts/angular-upgrade-audit.cjs`.',
    'These are stable releases whose declared Angular core/common peer ranges accept the target.',
    'They are candidates, not a solved installation: verify RxJS, Bootstrap, CDK, Node and package-specific migrations at each hop.',
    'A missing candidate blocks that dependency until it is replaced or removed. Never bypass peer checks.', '',
    '| Angular target | ' + packages.join(' | ') + ' |',
    '| --- | ' + packages.map(() => '---').join(' | ') + ' |'];
  const evidence = {};
  for (let major = 11; major <= 22; major++) {
    const angular = Object.keys(core.versions).filter(v => semver.valid(v) && !semver.prerelease(v) && semver.major(v) === major).sort(semver.rcompare)[0];
    if (!angular) throw new Error('No stable Angular ' + major);
    evidence[angular] = {};
    const cells = records.map((record, i) => {
      const version = Object.keys(record.versions).filter(v => {
        if (!semver.valid(v) || semver.prerelease(v) || record.versions[v].deprecated) return false;
        const peers = record.versions[v].peerDependencies || {};
        const ranges = ['@angular/core', '@angular/common'].filter(k => peers[k]);
        return ranges.length > 0 && ranges.every(k => semver.satisfies(angular, peers[k]));
      }).sort(semver.rcompare)[0];
      evidence[angular][packages[i]] = version ? {
        version, peers: record.versions[version].peerDependencies,
        engines: record.versions[version].engines || {},
        source: 'https://registry.npmjs.org/' + encodeURIComponent(packages[i]) + '/' + version
      } : null;
      return version || '**none**';
    });
    lines.push('| ' + angular + ' | ' + cells.join(' | ') + ' |');
  }
  fs.writeFileSync('docs/angular-upgrade-dependencies.json', JSON.stringify(evidence, null, 2) + '\n');
  fs.writeFileSync('docs/angular-upgrade-dependencies.md', lines.join('\n') + '\n');
  console.log(lines.join('\n'));
})().catch(error => { console.error(error); process.exitCode = 1; });
