output "vm_public_ip" {
  value = azurerm_linux_virtual_machine.vm.public_ip_address
}

output "private_key_file" {
  value = local_file.private_key.filename
}
