import { describe, expect, it } from "vitest";
import {
  buildPolicy,
  collectInline,
  nginxSnippet,
  policyFromSnippet,
  sha256,
} from "../../apps/docs/scripts/csp-policy.ts";

describe("collectInline", () => {
  it("hashes executable inline scripts and skips external scripts and data blocks", () => {
    const html = [
      "<script>console.log(1)</script>",
      '<script type="module">import "/a.js"</script>',
      '<script type="module" src="/_astro/x.js"></script>',
      '<script type="application/ld+json">{"@type":"WebSite"}</script>',
      '<script type="application/json" data-props>{"a":1}</script>',
    ].join("");

    const { scripts, handlers } = collectInline(html);

    expect([...scripts].sort()).toEqual(
      [sha256("console.log(1)"), sha256('import "/a.js"')].sort(),
    );
    expect(handlers.size).toBe(0);
  });

  it("hashes decoded inline handler attributes but not JSX or Alpine text", () => {
    const html = [
      '<img src="a.png" onload="this.__e=event" onerror="this.__e=event">',
      '<a href="#" onclick="go(&quot;x&quot;)">x</a>',
      "<button onClick={add}>add</button>",
      '<div x-data="{ online = navigator.onLine }"></div>',
    ].join("");

    const { handlers } = collectInline(html);

    expect([...handlers].sort()).toEqual(
      [sha256("this.__e=event"), sha256('go("x")')].sort(),
    );
  });
});

describe("buildPolicy", () => {
  it("adds 'unsafe-hashes' only when inline handlers exist", () => {
    const withoutHandlers = buildPolicy({
      scripts: new Set([sha256("a")]),
      handlers: new Set(),
    });
    const withHandlers = buildPolicy({
      scripts: new Set(),
      handlers: new Set([sha256("b")]),
    });

    expect(withoutHandlers).toContain(`script-src 'self'`);
    expect(withoutHandlers).toContain(sha256("a"));
    expect(withoutHandlers).not.toContain("'unsafe-hashes'");
    expect(withHandlers).toContain(`'unsafe-hashes' ${sha256("b")}`);
    expect(withHandlers).toContain("frame-ancestors 'self'");
    expect(withHandlers).toContain("object-src 'none'");
  });
});

describe("nginxSnippet", () => {
  const scripts = new Set(
    Array.from({ length: 120 }, (_, index) => sha256(`script ${index}`)),
  );
  const inline = { scripts, handlers: new Set<string>() };
  const policy = buildPolicy(inline);

  it("splits long policies under the nginx parameter limit and reads them back", () => {
    const snippet = nginxSnippet(policy, inline);
    const values = [...snippet.matchAll(/default "([^"]*)";/g)].map(
      (match) => match[1] ?? "",
    );

    expect(policy.length).toBeGreaterThan(4096);
    expect(values.every((value) => value.length < 4096)).toBe(true);
    expect(snippet).toContain("map $host $markas_csp_policy {");
    expect(policyFromSnippet(snippet)).toBe(policy);
  });

  it("refuses characters nginx would interpret", () => {
    expect(() => nginxSnippet(`script-src "$x"`, inline)).toThrow();
  });
});
