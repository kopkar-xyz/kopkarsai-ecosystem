## Related Issue
<!-- Reference the issue this PR resolves, e.g. Closes #101 -->
Closes #

## Summary of Changes
<!-- Concise summary of code and architecture changes -->
- 

## Scope Classification
- [ ] `CONTRACT`: Aspek legal, governance, kontrak induk
- [ ] `SHARED`: Autentikasi akun karyawan, S3 storage, session
- [ ] `KOPKAR`: Modul fungsional Koperasi Karyawan
- [ ] `MARKETPLACE`: Modul belanja dan kasir marketplace

## Type of Change
- [ ] `feat`: New feature / capability
- [ ] `fix`: Bug fix
- [ ] `refactor`: Code refactoring without behavior changes
- [ ] `docs`: Documentation updates
- [ ] `test`: Unit / integration test additions
- [ ] `chore`: Tooling / dependency updates

## Evidence of Testing
<!-- Paste command output, test run logs, or test coverage evidence -->
```text
```

## Reviewer Checklist
- [ ] Preserves KopKar SAI core invariants (One Contract - Two Applications, Dual-Approval, Numeric(15,2))
- [ ] 25 locked screens boundary respected (no unauthorized screen additions)
- [ ] No secrets, local configs (`developer.local.json`), or credentials committed
- [ ] Branch conforms to `{type}/{issue}-{slug}` convention
- [ ] Unit / integration / E2E tests passed locally
