# -*- mode: ruby -*-
# vi: set ft=ruby :

# Requires to perform this first: `vagrant plugin install vagrant-winnfsd`

Vagrant.configure("2") do |config|
  config.vm.box = "ArminVieweg/trusty64-lamp-typo3"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 443, host: 44300
  # config.vm.network "forwarded_port", guest: 3306, host: 33060
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # Share an additional folder to the guest VM.
  # config.vm.synced_folder ".", "/var/www"
  config.vm.synced_folder ".", "/var/www/html/typo3conf/ext/t3ddy", type: "nfs"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "190.168.0.244"
  config.vm.network "private_network", type: "dhcp"

  # Provider-specific configuration so you can fine-tune various
  config.vm.provider "virtualbox" do |vb|
    vb.memory = 4096
    vb.cpus = 2
  end

  # Run once
  config.vm.provision "shell", inline: <<-SHELL
    cd /var/www/html

    sudo rm -Rf typo3_src typo3 vendor index.php typo3conf/LocalConfiguration.php typo3conf/PackageStates.php

    php -r '$f=json_decode(file_get_contents($argv[1]),true);$f["require"][$argv[2]]=$argv[3];file_put_contents($argv[1],json_encode($f,448)."\n");' composer.json "typo3/cms" "^7.6"
    php -r '$f=json_decode(file_get_contents($argv[1]),true);$f["require"][$argv[2]]=$argv[3];file_put_contents($argv[1],json_encode($f,448)."\n");' composer.json "helhum/typo3-console" "^4.5"
    php -r '$f=json_decode(file_get_contents($argv[1]),true);$f["require"][$argv[2]]=$argv[3];file_put_contents($argv[1],json_encode($f,448)."\n");' composer.json "gridelementsteam/gridelements" "^7.1"
    composer update --no-progress -n -q

    vendor/bin/typo3cms  install:setup --force --database-user-name "root" --database-user-password "" --database-host-name "localhost" --database-name "typo3_76" --database-port "3306" --database-socket "" --admin-user-name "admin" --admin-password "password" --site-name "T3ddy Dev Environment" --site-setup-type "site" --use-existing-database 0
    vendor/bin/typo3cms cache:flush

    php typo3/cli_dispatch.phpsh extbase extension:install gridelements

    php -r '$f=json_decode(file_get_contents($argv[1]),true);$f["autoload"]["psr-4"][$argv[2]]=$argv[3];file_put_contents($argv[1],json_encode($f,448)."\n");' composer.json "ArminVieweg\\\\T3ddy\\\\" typo3conf/ext/t3ddy/Classes/
    composer dump -o
    php typo3/cli_dispatch.phpsh extbase extension:install t3ddy

    sudo chown -R vagrant /var/www/html
    sudo chgrp -R www-data /var/www/html
  SHELL

  # Run always
  config.vm.provision "shell", run: "always", inline: <<-SHELL
    cd ~
    sudo composer self-update --no-progress
  SHELL

end
