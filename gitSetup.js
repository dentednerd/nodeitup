const colors = require('colors');
const { exec, execSync } = require('child_process');

const gitSetup = async (createGithubRepo, path) => {
  if (createGithubRepo === "no") return;

  console.log(colors.yellow("\nCreating Github repo..."));

  try {
    await execSync(`if gh auth status || exit 2
    then
      echo "gh authorised"
    else
      gh auth login --web
    fi`,
      { stdio: 'inherit' }
    );
  } catch (err) {
    if (err.status === 2) console.log(colors.red("gh is not installed."));
  }

  await execSync(`cd ${path}
  git init
  gh repo create '${path}' --confirm --private
  git branch -M main
  git add .
  git commit -m 'initial commit'
  git push origin main`,
    { stdio: 'ignore' }
  );
  console.log(colors.green("Github repo created."));
  return;
}

module.exports = gitSetup;
