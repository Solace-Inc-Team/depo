-- Empresa sem nenhuma filial não consegue entrar (o login procura a filial de quem acessa).
-- O admin da Solace era criado assim; esta migração dá a filial "Principal" a quem não tem nenhuma.
INSERT INTO "branches" ("tenant_id", "name", "slug", "main")
SELECT t."id", 'Principal', 'principal', true
FROM "tenants" t
WHERE NOT EXISTS (SELECT 1 FROM "branches" b WHERE b."tenant_id" = t."id");
