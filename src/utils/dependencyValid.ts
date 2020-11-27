import semver from 'semver';

export default function dependencyValid(
  installedVersion: string,
  requiredVersion: string
) {
  const versionDiff = semver.diff(installedVersion, requiredVersion);
  return (
    (versionDiff === null ||
      versionDiff === 'patch' ||
      versionDiff === 'minor') &&
    semver.gte(installedVersion, requiredVersion)
  );
}
