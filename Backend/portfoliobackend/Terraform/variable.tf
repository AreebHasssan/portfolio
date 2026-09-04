variable "resource_group_name" {
  type        = string
  default     = "devops-projects-rg"
  description = "Name of the Azure Resource Group"
}

variable "location" {
  type        = string
  default     = "East US"
  description = "Azure Region for all resources"
}

variable "vm_name" {
  type        = string
  default     = "azure-node"
  description = "Name of the Virtual Machine"
}

variable "vm_size" {
  type        = string
  default     = "Standard_B2s"
  description = "Size of the Azure Virtual Machine"
}

variable "admin_username" {
  type        = string
  default     = "azureuser"
  description = "Admin username for SSH login"
}
