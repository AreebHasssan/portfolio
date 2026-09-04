output "vm_public_ip" {
  value       = azurerm_linux_virtual_machine.vm.public_ip_address
  description = "The Public IP address of the Azure Virtual Machine"
}

output "private_key_path" {
  value       = local_file.private_key.filename
  description = "Path where the SSH private key was downloaded on your PC"
}

output "ssh_command" {
  value       = "ssh -i ${local_file.private_key.filename} ${var.admin_username}@${azurerm_linux_virtual_machine.vm.public_ip_address}"
  description = "Command to SSH into the Azure Virtual Machine"
}
