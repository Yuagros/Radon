const STORAGE_KEYS = {
    plan: "radon_selected_plan",
    auth: "radon_auth",
    theme: "radon_theme",
    rememberedEmail: "radon_remembered_email"
};

const RULE_LIBRARY = [
    { id: 'R-0001', name: 'Validation Rule 1', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 1 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0002', name: 'Validation Rule 2', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 2 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0003', name: 'Validation Rule 3', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 3 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0004', name: 'Validation Rule 4', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 4 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0005', name: 'Validation Rule 5', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 5 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0006', name: 'Validation Rule 6', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 6 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0007', name: 'Validation Rule 7', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 7 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0008', name: 'Validation Rule 8', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 8 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0009', name: 'Validation Rule 9', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 9 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0010', name: 'Validation Rule 10', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 10 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0011', name: 'Validation Rule 11', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 11 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0012', name: 'Validation Rule 12', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 12 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0013', name: 'Validation Rule 13', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 13 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0014', name: 'Validation Rule 14', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 14 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0015', name: 'Validation Rule 15', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 15 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0016', name: 'Validation Rule 16', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 16 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0017', name: 'Validation Rule 17', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 17 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0018', name: 'Validation Rule 18', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 18 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0019', name: 'Validation Rule 19', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 19 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0020', name: 'Validation Rule 20', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 20 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0021', name: 'Validation Rule 21', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 21 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0022', name: 'Validation Rule 22', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 22 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0023', name: 'Validation Rule 23', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 23 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0024', name: 'Validation Rule 24', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 24 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0025', name: 'Validation Rule 25', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 25 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0026', name: 'Validation Rule 26', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 26 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0027', name: 'Validation Rule 27', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 27 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0028', name: 'Validation Rule 28', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 28 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0029', name: 'Validation Rule 29', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 29 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0030', name: 'Validation Rule 30', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 30 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0031', name: 'Validation Rule 31', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 31 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0032', name: 'Validation Rule 32', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 32 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0033', name: 'Validation Rule 33', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 33 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0034', name: 'Validation Rule 34', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 34 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0035', name: 'Validation Rule 35', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 35 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0036', name: 'Validation Rule 36', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 36 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0037', name: 'Validation Rule 37', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 37 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0038', name: 'Validation Rule 38', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 38 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0039', name: 'Validation Rule 39', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 39 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0040', name: 'Validation Rule 40', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 40 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0041', name: 'Validation Rule 41', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 41 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0042', name: 'Validation Rule 42', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 42 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0043', name: 'Validation Rule 43', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 43 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0044', name: 'Validation Rule 44', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 44 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0045', name: 'Validation Rule 45', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 45 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0046', name: 'Validation Rule 46', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 46 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0047', name: 'Validation Rule 47', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 47 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0048', name: 'Validation Rule 48', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 48 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0049', name: 'Validation Rule 49', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 49 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0050', name: 'Validation Rule 50', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 50 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0051', name: 'Validation Rule 51', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 51 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0052', name: 'Validation Rule 52', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 52 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0053', name: 'Validation Rule 53', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 53 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0054', name: 'Validation Rule 54', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 54 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0055', name: 'Validation Rule 55', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 55 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0056', name: 'Validation Rule 56', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 56 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0057', name: 'Validation Rule 57', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 57 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0058', name: 'Validation Rule 58', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 58 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0059', name: 'Validation Rule 59', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 59 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0060', name: 'Validation Rule 60', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 60 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0061', name: 'Validation Rule 61', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 61 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0062', name: 'Validation Rule 62', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 62 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0063', name: 'Validation Rule 63', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 63 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0064', name: 'Validation Rule 64', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 64 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0065', name: 'Validation Rule 65', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 65 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0066', name: 'Validation Rule 66', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 66 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0067', name: 'Validation Rule 67', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 67 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0068', name: 'Validation Rule 68', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 68 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0069', name: 'Validation Rule 69', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 69 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0070', name: 'Validation Rule 70', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 70 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0071', name: 'Validation Rule 71', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 71 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0072', name: 'Validation Rule 72', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 72 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0073', name: 'Validation Rule 73', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 73 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0074', name: 'Validation Rule 74', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 74 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0075', name: 'Validation Rule 75', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 75 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0076', name: 'Validation Rule 76', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 76 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0077', name: 'Validation Rule 77', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 77 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0078', name: 'Validation Rule 78', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 78 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0079', name: 'Validation Rule 79', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 79 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0080', name: 'Validation Rule 80', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 80 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0081', name: 'Validation Rule 81', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 81 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0082', name: 'Validation Rule 82', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 82 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0083', name: 'Validation Rule 83', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 83 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0084', name: 'Validation Rule 84', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 84 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0085', name: 'Validation Rule 85', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 85 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0086', name: 'Validation Rule 86', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 86 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0087', name: 'Validation Rule 87', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 87 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0088', name: 'Validation Rule 88', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 88 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0089', name: 'Validation Rule 89', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 89 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0090', name: 'Validation Rule 90', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 90 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0091', name: 'Validation Rule 91', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 91 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0092', name: 'Validation Rule 92', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 92 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0093', name: 'Validation Rule 93', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 93 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0094', name: 'Validation Rule 94', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 94 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0095', name: 'Validation Rule 95', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 95 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0096', name: 'Validation Rule 96', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 96 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0097', name: 'Validation Rule 97', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 97 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0098', name: 'Validation Rule 98', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 98 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0099', name: 'Validation Rule 99', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 99 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0100', name: 'Validation Rule 100', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 100 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0101', name: 'Validation Rule 101', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 101 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0102', name: 'Validation Rule 102', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 102 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0103', name: 'Validation Rule 103', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 103 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0104', name: 'Validation Rule 104', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 104 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0105', name: 'Validation Rule 105', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 105 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0106', name: 'Validation Rule 106', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 106 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0107', name: 'Validation Rule 107', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 107 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0108', name: 'Validation Rule 108', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 108 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0109', name: 'Validation Rule 109', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 109 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0110', name: 'Validation Rule 110', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 110 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0111', name: 'Validation Rule 111', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 111 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0112', name: 'Validation Rule 112', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 112 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0113', name: 'Validation Rule 113', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 113 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0114', name: 'Validation Rule 114', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 114 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0115', name: 'Validation Rule 115', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 115 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0116', name: 'Validation Rule 116', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 116 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0117', name: 'Validation Rule 117', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 117 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0118', name: 'Validation Rule 118', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 118 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0119', name: 'Validation Rule 119', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 119 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0120', name: 'Validation Rule 120', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 120 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0121', name: 'Validation Rule 121', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 121 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0122', name: 'Validation Rule 122', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 122 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0123', name: 'Validation Rule 123', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 123 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0124', name: 'Validation Rule 124', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 124 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0125', name: 'Validation Rule 125', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 125 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0126', name: 'Validation Rule 126', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 126 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0127', name: 'Validation Rule 127', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 127 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0128', name: 'Validation Rule 128', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 128 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0129', name: 'Validation Rule 129', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 129 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0130', name: 'Validation Rule 130', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 130 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0131', name: 'Validation Rule 131', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 131 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0132', name: 'Validation Rule 132', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 132 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0133', name: 'Validation Rule 133', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 133 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0134', name: 'Validation Rule 134', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 134 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0135', name: 'Validation Rule 135', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 135 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0136', name: 'Validation Rule 136', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 136 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0137', name: 'Validation Rule 137', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 137 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0138', name: 'Validation Rule 138', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 138 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0139', name: 'Validation Rule 139', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 139 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0140', name: 'Validation Rule 140', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 140 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0141', name: 'Validation Rule 141', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 141 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0142', name: 'Validation Rule 142', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 142 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0143', name: 'Validation Rule 143', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 143 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0144', name: 'Validation Rule 144', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 144 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0145', name: 'Validation Rule 145', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 145 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0146', name: 'Validation Rule 146', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 146 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0147', name: 'Validation Rule 147', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 147 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0148', name: 'Validation Rule 148', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 148 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0149', name: 'Validation Rule 149', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 149 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0150', name: 'Validation Rule 150', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 150 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0151', name: 'Validation Rule 151', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 151 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0152', name: 'Validation Rule 152', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 152 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0153', name: 'Validation Rule 153', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 153 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0154', name: 'Validation Rule 154', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 154 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0155', name: 'Validation Rule 155', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 155 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0156', name: 'Validation Rule 156', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 156 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0157', name: 'Validation Rule 157', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 157 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0158', name: 'Validation Rule 158', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 158 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0159', name: 'Validation Rule 159', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 159 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0160', name: 'Validation Rule 160', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 160 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0161', name: 'Validation Rule 161', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 161 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0162', name: 'Validation Rule 162', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 162 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0163', name: 'Validation Rule 163', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 163 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0164', name: 'Validation Rule 164', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 164 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0165', name: 'Validation Rule 165', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 165 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0166', name: 'Validation Rule 166', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 166 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0167', name: 'Validation Rule 167', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 167 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0168', name: 'Validation Rule 168', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 168 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0169', name: 'Validation Rule 169', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 169 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0170', name: 'Validation Rule 170', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 170 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0171', name: 'Validation Rule 171', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 171 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0172', name: 'Validation Rule 172', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 172 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0173', name: 'Validation Rule 173', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 173 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0174', name: 'Validation Rule 174', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 174 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0175', name: 'Validation Rule 175', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 175 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0176', name: 'Validation Rule 176', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 176 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0177', name: 'Validation Rule 177', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 177 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0178', name: 'Validation Rule 178', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 178 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0179', name: 'Validation Rule 179', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 179 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0180', name: 'Validation Rule 180', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 180 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0181', name: 'Validation Rule 181', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 181 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0182', name: 'Validation Rule 182', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 182 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0183', name: 'Validation Rule 183', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 183 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0184', name: 'Validation Rule 184', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 184 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0185', name: 'Validation Rule 185', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 185 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0186', name: 'Validation Rule 186', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 186 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0187', name: 'Validation Rule 187', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 187 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0188', name: 'Validation Rule 188', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 188 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0189', name: 'Validation Rule 189', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 189 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0190', name: 'Validation Rule 190', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 190 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0191', name: 'Validation Rule 191', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 191 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0192', name: 'Validation Rule 192', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 192 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0193', name: 'Validation Rule 193', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 193 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0194', name: 'Validation Rule 194', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 194 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0195', name: 'Validation Rule 195', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 195 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0196', name: 'Validation Rule 196', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 196 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0197', name: 'Validation Rule 197', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 197 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0198', name: 'Validation Rule 198', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 198 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0199', name: 'Validation Rule 199', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 199 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0200', name: 'Validation Rule 200', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 200 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0201', name: 'Validation Rule 201', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 201 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0202', name: 'Validation Rule 202', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 202 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0203', name: 'Validation Rule 203', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 203 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0204', name: 'Validation Rule 204', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 204 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0205', name: 'Validation Rule 205', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 205 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0206', name: 'Validation Rule 206', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 206 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0207', name: 'Validation Rule 207', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 207 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0208', name: 'Validation Rule 208', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 208 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0209', name: 'Validation Rule 209', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 209 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0210', name: 'Validation Rule 210', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 210 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0211', name: 'Validation Rule 211', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 211 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0212', name: 'Validation Rule 212', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 212 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0213', name: 'Validation Rule 213', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 213 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0214', name: 'Validation Rule 214', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 214 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0215', name: 'Validation Rule 215', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 215 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0216', name: 'Validation Rule 216', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 216 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0217', name: 'Validation Rule 217', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 217 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0218', name: 'Validation Rule 218', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 218 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0219', name: 'Validation Rule 219', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 219 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0220', name: 'Validation Rule 220', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 220 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0221', name: 'Validation Rule 221', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 221 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0222', name: 'Validation Rule 222', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 222 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0223', name: 'Validation Rule 223', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 223 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0224', name: 'Validation Rule 224', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 224 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0225', name: 'Validation Rule 225', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 225 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0226', name: 'Validation Rule 226', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 226 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0227', name: 'Validation Rule 227', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 227 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0228', name: 'Validation Rule 228', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 228 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0229', name: 'Validation Rule 229', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 229 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0230', name: 'Validation Rule 230', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 230 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0231', name: 'Validation Rule 231', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 231 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0232', name: 'Validation Rule 232', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 232 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0233', name: 'Validation Rule 233', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 233 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0234', name: 'Validation Rule 234', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 234 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0235', name: 'Validation Rule 235', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 235 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0236', name: 'Validation Rule 236', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 236 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0237', name: 'Validation Rule 237', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 237 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0238', name: 'Validation Rule 238', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 238 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0239', name: 'Validation Rule 239', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 239 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0240', name: 'Validation Rule 240', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 240 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0241', name: 'Validation Rule 241', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 241 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0242', name: 'Validation Rule 242', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 242 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0243', name: 'Validation Rule 243', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 243 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0244', name: 'Validation Rule 244', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 244 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0245', name: 'Validation Rule 245', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 245 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0246', name: 'Validation Rule 246', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 246 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0247', name: 'Validation Rule 247', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 247 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0248', name: 'Validation Rule 248', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 248 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0249', name: 'Validation Rule 249', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 249 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0250', name: 'Validation Rule 250', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 250 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0251', name: 'Validation Rule 251', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 251 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0252', name: 'Validation Rule 252', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 252 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0253', name: 'Validation Rule 253', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 253 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0254', name: 'Validation Rule 254', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 254 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0255', name: 'Validation Rule 255', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 255 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0256', name: 'Validation Rule 256', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 256 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0257', name: 'Validation Rule 257', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 257 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0258', name: 'Validation Rule 258', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 258 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0259', name: 'Validation Rule 259', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 259 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0260', name: 'Validation Rule 260', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 260 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0261', name: 'Validation Rule 261', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 261 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0262', name: 'Validation Rule 262', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 262 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0263', name: 'Validation Rule 263', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 263 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0264', name: 'Validation Rule 264', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 264 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0265', name: 'Validation Rule 265', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 265 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0266', name: 'Validation Rule 266', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 266 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0267', name: 'Validation Rule 267', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 267 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0268', name: 'Validation Rule 268', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 268 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0269', name: 'Validation Rule 269', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 269 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0270', name: 'Validation Rule 270', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 270 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0271', name: 'Validation Rule 271', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 271 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0272', name: 'Validation Rule 272', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 272 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0273', name: 'Validation Rule 273', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 273 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0274', name: 'Validation Rule 274', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 274 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0275', name: 'Validation Rule 275', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 275 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0276', name: 'Validation Rule 276', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 276 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0277', name: 'Validation Rule 277', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 277 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0278', name: 'Validation Rule 278', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 278 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0279', name: 'Validation Rule 279', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 279 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0280', name: 'Validation Rule 280', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 280 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0281', name: 'Validation Rule 281', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 281 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0282', name: 'Validation Rule 282', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 282 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0283', name: 'Validation Rule 283', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 283 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0284', name: 'Validation Rule 284', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 284 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0285', name: 'Validation Rule 285', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 285 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0286', name: 'Validation Rule 286', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 286 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0287', name: 'Validation Rule 287', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 287 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0288', name: 'Validation Rule 288', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 288 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0289', name: 'Validation Rule 289', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 289 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0290', name: 'Validation Rule 290', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 290 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0291', name: 'Validation Rule 291', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 291 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0292', name: 'Validation Rule 292', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 292 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0293', name: 'Validation Rule 293', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 293 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0294', name: 'Validation Rule 294', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 294 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0295', name: 'Validation Rule 295', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 295 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0296', name: 'Validation Rule 296', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 296 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0297', name: 'Validation Rule 297', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 297 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0298', name: 'Validation Rule 298', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 298 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0299', name: 'Validation Rule 299', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 299 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0300', name: 'Validation Rule 300', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 300 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0301', name: 'Validation Rule 301', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 301 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0302', name: 'Validation Rule 302', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 302 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0303', name: 'Validation Rule 303', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 303 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0304', name: 'Validation Rule 304', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 304 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0305', name: 'Validation Rule 305', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 305 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0306', name: 'Validation Rule 306', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 306 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0307', name: 'Validation Rule 307', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 307 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0308', name: 'Validation Rule 308', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 308 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0309', name: 'Validation Rule 309', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 309 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0310', name: 'Validation Rule 310', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 310 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0311', name: 'Validation Rule 311', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 311 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0312', name: 'Validation Rule 312', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 312 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0313', name: 'Validation Rule 313', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 313 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0314', name: 'Validation Rule 314', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 314 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0315', name: 'Validation Rule 315', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 315 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0316', name: 'Validation Rule 316', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 316 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0317', name: 'Validation Rule 317', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 317 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0318', name: 'Validation Rule 318', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 318 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0319', name: 'Validation Rule 319', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 319 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0320', name: 'Validation Rule 320', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 320 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0321', name: 'Validation Rule 321', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 321 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0322', name: 'Validation Rule 322', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 322 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0323', name: 'Validation Rule 323', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 323 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0324', name: 'Validation Rule 324', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 324 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0325', name: 'Validation Rule 325', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 325 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0326', name: 'Validation Rule 326', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 326 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0327', name: 'Validation Rule 327', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 327 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0328', name: 'Validation Rule 328', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 328 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0329', name: 'Validation Rule 329', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 329 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0330', name: 'Validation Rule 330', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 330 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0331', name: 'Validation Rule 331', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 331 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0332', name: 'Validation Rule 332', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 332 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0333', name: 'Validation Rule 333', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 333 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0334', name: 'Validation Rule 334', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 334 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0335', name: 'Validation Rule 335', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 335 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0336', name: 'Validation Rule 336', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 336 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0337', name: 'Validation Rule 337', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 337 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0338', name: 'Validation Rule 338', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 338 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0339', name: 'Validation Rule 339', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 339 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0340', name: 'Validation Rule 340', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 340 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0341', name: 'Validation Rule 341', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 341 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0342', name: 'Validation Rule 342', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 342 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0343', name: 'Validation Rule 343', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 343 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0344', name: 'Validation Rule 344', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 344 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0345', name: 'Validation Rule 345', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 345 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0346', name: 'Validation Rule 346', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 346 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0347', name: 'Validation Rule 347', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 347 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0348', name: 'Validation Rule 348', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 348 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0349', name: 'Validation Rule 349', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 349 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0350', name: 'Validation Rule 350', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 350 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0351', name: 'Validation Rule 351', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 351 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0352', name: 'Validation Rule 352', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 352 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0353', name: 'Validation Rule 353', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 353 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0354', name: 'Validation Rule 354', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 354 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0355', name: 'Validation Rule 355', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 355 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0356', name: 'Validation Rule 356', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 356 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0357', name: 'Validation Rule 357', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 357 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0358', name: 'Validation Rule 358', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 358 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0359', name: 'Validation Rule 359', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 359 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0360', name: 'Validation Rule 360', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 360 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0361', name: 'Validation Rule 361', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 361 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0362', name: 'Validation Rule 362', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 362 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0363', name: 'Validation Rule 363', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 363 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0364', name: 'Validation Rule 364', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 364 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0365', name: 'Validation Rule 365', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 365 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0366', name: 'Validation Rule 366', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 366 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0367', name: 'Validation Rule 367', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 367 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0368', name: 'Validation Rule 368', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 368 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0369', name: 'Validation Rule 369', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 369 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0370', name: 'Validation Rule 370', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 370 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0371', name: 'Validation Rule 371', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 371 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0372', name: 'Validation Rule 372', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 372 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0373', name: 'Validation Rule 373', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 373 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0374', name: 'Validation Rule 374', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 374 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0375', name: 'Validation Rule 375', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 375 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0376', name: 'Validation Rule 376', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 376 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0377', name: 'Validation Rule 377', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 377 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0378', name: 'Validation Rule 378', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 378 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0379', name: 'Validation Rule 379', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 379 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0380', name: 'Validation Rule 380', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 380 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0381', name: 'Validation Rule 381', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 381 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0382', name: 'Validation Rule 382', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 382 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0383', name: 'Validation Rule 383', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 383 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0384', name: 'Validation Rule 384', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 384 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0385', name: 'Validation Rule 385', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 385 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0386', name: 'Validation Rule 386', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 386 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0387', name: 'Validation Rule 387', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 387 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0388', name: 'Validation Rule 388', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 388 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0389', name: 'Validation Rule 389', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 389 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0390', name: 'Validation Rule 390', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 390 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0391', name: 'Validation Rule 391', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 391 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0392', name: 'Validation Rule 392', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 392 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0393', name: 'Validation Rule 393', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 393 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0394', name: 'Validation Rule 394', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 394 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0395', name: 'Validation Rule 395', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 395 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0396', name: 'Validation Rule 396', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 396 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0397', name: 'Validation Rule 397', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 397 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0398', name: 'Validation Rule 398', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 398 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0399', name: 'Validation Rule 399', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 399 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0400', name: 'Validation Rule 400', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 400 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0401', name: 'Validation Rule 401', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 401 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0402', name: 'Validation Rule 402', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 402 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0403', name: 'Validation Rule 403', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 403 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0404', name: 'Validation Rule 404', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 404 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0405', name: 'Validation Rule 405', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 405 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0406', name: 'Validation Rule 406', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 406 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0407', name: 'Validation Rule 407', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 407 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0408', name: 'Validation Rule 408', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 408 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0409', name: 'Validation Rule 409', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 409 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0410', name: 'Validation Rule 410', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 410 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0411', name: 'Validation Rule 411', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 411 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0412', name: 'Validation Rule 412', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 412 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0413', name: 'Validation Rule 413', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 413 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0414', name: 'Validation Rule 414', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 414 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0415', name: 'Validation Rule 415', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 415 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0416', name: 'Validation Rule 416', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 416 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0417', name: 'Validation Rule 417', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 417 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0418', name: 'Validation Rule 418', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 418 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0419', name: 'Validation Rule 419', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 419 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0420', name: 'Validation Rule 420', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 420 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0421', name: 'Validation Rule 421', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 421 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0422', name: 'Validation Rule 422', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 422 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0423', name: 'Validation Rule 423', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 423 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0424', name: 'Validation Rule 424', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 424 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0425', name: 'Validation Rule 425', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 425 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0426', name: 'Validation Rule 426', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 426 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0427', name: 'Validation Rule 427', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 427 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0428', name: 'Validation Rule 428', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 428 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0429', name: 'Validation Rule 429', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 429 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0430', name: 'Validation Rule 430', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 430 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0431', name: 'Validation Rule 431', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 431 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0432', name: 'Validation Rule 432', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 432 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0433', name: 'Validation Rule 433', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 433 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0434', name: 'Validation Rule 434', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 434 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0435', name: 'Validation Rule 435', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 435 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0436', name: 'Validation Rule 436', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 436 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0437', name: 'Validation Rule 437', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 437 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0438', name: 'Validation Rule 438', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 438 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0439', name: 'Validation Rule 439', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 439 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0440', name: 'Validation Rule 440', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 440 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0441', name: 'Validation Rule 441', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 441 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0442', name: 'Validation Rule 442', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 442 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0443', name: 'Validation Rule 443', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 443 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0444', name: 'Validation Rule 444', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 444 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0445', name: 'Validation Rule 445', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 445 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0446', name: 'Validation Rule 446', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 446 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0447', name: 'Validation Rule 447', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 447 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0448', name: 'Validation Rule 448', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 448 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0449', name: 'Validation Rule 449', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 449 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0450', name: 'Validation Rule 450', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 450 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0451', name: 'Validation Rule 451', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 451 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0452', name: 'Validation Rule 452', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 452 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0453', name: 'Validation Rule 453', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 453 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0454', name: 'Validation Rule 454', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 454 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0455', name: 'Validation Rule 455', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 455 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0456', name: 'Validation Rule 456', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 456 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0457', name: 'Validation Rule 457', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 457 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0458', name: 'Validation Rule 458', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 458 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0459', name: 'Validation Rule 459', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 459 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0460', name: 'Validation Rule 460', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 460 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0461', name: 'Validation Rule 461', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 461 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0462', name: 'Validation Rule 462', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 462 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0463', name: 'Validation Rule 463', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 463 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0464', name: 'Validation Rule 464', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 464 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0465', name: 'Validation Rule 465', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 465 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0466', name: 'Validation Rule 466', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 466 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0467', name: 'Validation Rule 467', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 467 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0468', name: 'Validation Rule 468', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 468 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0469', name: 'Validation Rule 469', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 469 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0470', name: 'Validation Rule 470', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 470 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0471', name: 'Validation Rule 471', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 471 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0472', name: 'Validation Rule 472', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 472 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0473', name: 'Validation Rule 473', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 473 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0474', name: 'Validation Rule 474', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 474 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0475', name: 'Validation Rule 475', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 475 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0476', name: 'Validation Rule 476', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 476 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0477', name: 'Validation Rule 477', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 477 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0478', name: 'Validation Rule 478', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 478 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0479', name: 'Validation Rule 479', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 479 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0480', name: 'Validation Rule 480', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 480 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0481', name: 'Validation Rule 481', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 481 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0482', name: 'Validation Rule 482', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 482 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0483', name: 'Validation Rule 483', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 483 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0484', name: 'Validation Rule 484', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 484 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0485', name: 'Validation Rule 485', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 485 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0486', name: 'Validation Rule 486', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 486 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0487', name: 'Validation Rule 487', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 487 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0488', name: 'Validation Rule 488', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 488 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0489', name: 'Validation Rule 489', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 489 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0490', name: 'Validation Rule 490', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 490 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0491', name: 'Validation Rule 491', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 491 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0492', name: 'Validation Rule 492', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 492 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0493', name: 'Validation Rule 493', category: 'Automation', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 493 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0494', name: 'Validation Rule 494', category: 'Network', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 494 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0495', name: 'Validation Rule 495', category: 'Physics', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 495 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0496', name: 'Validation Rule 496', category: 'Inventory', sensitivity: 'Low', action: 'Flag', notes: 'Rule 496 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0497', name: 'Validation Rule 497', category: 'Movement', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 497 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0498', name: 'Validation Rule 498', category: 'Combat', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 498 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0499', name: 'Validation Rule 499', category: 'Economy', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 499 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0500', name: 'Validation Rule 500', category: 'Automation', sensitivity: 'Low', action: 'Flag', notes: 'Rule 500 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0501', name: 'Validation Rule 501', category: 'Network', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 501 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0502', name: 'Validation Rule 502', category: 'Physics', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 502 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0503', name: 'Validation Rule 503', category: 'Inventory', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 503 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0504', name: 'Validation Rule 504', category: 'Movement', sensitivity: 'Low', action: 'Flag', notes: 'Rule 504 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0505', name: 'Validation Rule 505', category: 'Combat', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 505 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0506', name: 'Validation Rule 506', category: 'Economy', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 506 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0507', name: 'Validation Rule 507', category: 'Automation', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 507 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0508', name: 'Validation Rule 508', category: 'Network', sensitivity: 'Low', action: 'Flag', notes: 'Rule 508 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0509', name: 'Validation Rule 509', category: 'Physics', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 509 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0510', name: 'Validation Rule 510', category: 'Inventory', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 510 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0511', name: 'Validation Rule 511', category: 'Movement', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 511 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0512', name: 'Validation Rule 512', category: 'Combat', sensitivity: 'Low', action: 'Flag', notes: 'Rule 512 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0513', name: 'Validation Rule 513', category: 'Economy', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 513 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0514', name: 'Validation Rule 514', category: 'Automation', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 514 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0515', name: 'Validation Rule 515', category: 'Network', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 515 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0516', name: 'Validation Rule 516', category: 'Physics', sensitivity: 'Low', action: 'Flag', notes: 'Rule 516 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0517', name: 'Validation Rule 517', category: 'Inventory', sensitivity: 'Medium', action: 'Kick', notes: 'Rule 517 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0518', name: 'Validation Rule 518', category: 'Movement', sensitivity: 'High', action: 'Temp Ban', notes: 'Rule 518 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0519', name: 'Validation Rule 519', category: 'Combat', sensitivity: 'Strict', action: 'Perm Ban', notes: 'Rule 519 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
    { id: 'R-0520', name: 'Validation Rule 520', category: 'Economy', sensitivity: 'Low', action: 'Flag', notes: 'Rule 520 verifies server-authoritative state integrity across movement, remotes, and inventory deltas.' },
];

const INCIDENT_LIBRARY = [
    { id: 'I-00001', player: 'Player_0001', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00002', player: 'Player_0002', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 7 },
    { id: 'I-00003', player: 'Player_0003', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 10 },
    { id: 'I-00004', player: 'Player_0004', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 13 },
    { id: 'I-00005', player: 'Player_0005', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 16 },
    { id: 'I-00006', player: 'Player_0006', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 19 },
    { id: 'I-00007', player: 'Player_0007', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 22 },
    { id: 'I-00008', player: 'Player_0008', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 25 },
    { id: 'I-00009', player: 'Player_0009', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 28 },
    { id: 'I-00010', player: 'Player_0010', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 31 },
    { id: 'I-00011', player: 'Player_0011', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 34 },
    { id: 'I-00012', player: 'Player_0012', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 37 },
    { id: 'I-00013', player: 'Player_0013', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 40 },
    { id: 'I-00014', player: 'Player_0014', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 43 },
    { id: 'I-00015', player: 'Player_0015', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 46 },
    { id: 'I-00016', player: 'Player_0016', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 49 },
    { id: 'I-00017', player: 'Player_0017', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 52 },
    { id: 'I-00018', player: 'Player_0018', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 55 },
    { id: 'I-00019', player: 'Player_0019', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 1 },
    { id: 'I-00020', player: 'Player_0020', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 4 },
    { id: 'I-00021', player: 'Player_0021', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 7 },
    { id: 'I-00022', player: 'Player_0022', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 10 },
    { id: 'I-00023', player: 'Player_0023', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 13 },
    { id: 'I-00024', player: 'Player_0024', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 16 },
    { id: 'I-00025', player: 'Player_0025', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 19 },
    { id: 'I-00026', player: 'Player_0026', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 22 },
    { id: 'I-00027', player: 'Player_0027', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 25 },
    { id: 'I-00028', player: 'Player_0028', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 28 },
    { id: 'I-00029', player: 'Player_0029', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 31 },
    { id: 'I-00030', player: 'Player_0030', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 34 },
    { id: 'I-00031', player: 'Player_0031', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 37 },
    { id: 'I-00032', player: 'Player_0032', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 40 },
    { id: 'I-00033', player: 'Player_0033', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 43 },
    { id: 'I-00034', player: 'Player_0034', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 46 },
    { id: 'I-00035', player: 'Player_0035', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 49 },
    { id: 'I-00036', player: 'Player_0036', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 52 },
    { id: 'I-00037', player: 'Player_0037', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 55 },
    { id: 'I-00038', player: 'Player_0038', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 1 },
    { id: 'I-00039', player: 'Player_0039', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00040', player: 'Player_0040', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 7 },
    { id: 'I-00041', player: 'Player_0041', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 10 },
    { id: 'I-00042', player: 'Player_0042', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 13 },
    { id: 'I-00043', player: 'Player_0043', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 16 },
    { id: 'I-00044', player: 'Player_0044', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 19 },
    { id: 'I-00045', player: 'Player_0045', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 22 },
    { id: 'I-00046', player: 'Player_0046', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 25 },
    { id: 'I-00047', player: 'Player_0047', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 28 },
    { id: 'I-00048', player: 'Player_0048', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 31 },
    { id: 'I-00049', player: 'Player_0049', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 34 },
    { id: 'I-00050', player: 'Player_0050', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 37 },
    { id: 'I-00051', player: 'Player_0051', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 40 },
    { id: 'I-00052', player: 'Player_0052', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 43 },
    { id: 'I-00053', player: 'Player_0053', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 46 },
    { id: 'I-00054', player: 'Player_0054', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 49 },
    { id: 'I-00055', player: 'Player_0055', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 52 },
    { id: 'I-00056', player: 'Player_0056', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 55 },
    { id: 'I-00057', player: 'Player_0057', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 1 },
    { id: 'I-00058', player: 'Player_0058', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 4 },
    { id: 'I-00059', player: 'Player_0059', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 7 },
    { id: 'I-00060', player: 'Player_0060', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 10 },
    { id: 'I-00061', player: 'Player_0061', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 13 },
    { id: 'I-00062', player: 'Player_0062', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 16 },
    { id: 'I-00063', player: 'Player_0063', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 19 },
    { id: 'I-00064', player: 'Player_0064', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 22 },
    { id: 'I-00065', player: 'Player_0065', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 25 },
    { id: 'I-00066', player: 'Player_0066', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 28 },
    { id: 'I-00067', player: 'Player_0067', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 31 },
    { id: 'I-00068', player: 'Player_0068', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 34 },
    { id: 'I-00069', player: 'Player_0069', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 37 },
    { id: 'I-00070', player: 'Player_0070', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 40 },
    { id: 'I-00071', player: 'Player_0071', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 43 },
    { id: 'I-00072', player: 'Player_0072', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 46 },
    { id: 'I-00073', player: 'Player_0073', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 49 },
    { id: 'I-00074', player: 'Player_0074', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 52 },
    { id: 'I-00075', player: 'Player_0075', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 55 },
    { id: 'I-00076', player: 'Player_0076', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 1 },
    { id: 'I-00077', player: 'Player_0077', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00078', player: 'Player_0078', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 7 },
    { id: 'I-00079', player: 'Player_0079', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 10 },
    { id: 'I-00080', player: 'Player_0080', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 13 },
    { id: 'I-00081', player: 'Player_0081', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 16 },
    { id: 'I-00082', player: 'Player_0082', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 19 },
    { id: 'I-00083', player: 'Player_0083', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 22 },
    { id: 'I-00084', player: 'Player_0084', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 25 },
    { id: 'I-00085', player: 'Player_0085', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 28 },
    { id: 'I-00086', player: 'Player_0086', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 31 },
    { id: 'I-00087', player: 'Player_0087', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 34 },
    { id: 'I-00088', player: 'Player_0088', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 37 },
    { id: 'I-00089', player: 'Player_0089', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 40 },
    { id: 'I-00090', player: 'Player_0090', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 43 },
    { id: 'I-00091', player: 'Player_0091', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 46 },
    { id: 'I-00092', player: 'Player_0092', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 49 },
    { id: 'I-00093', player: 'Player_0093', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 52 },
    { id: 'I-00094', player: 'Player_0094', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 55 },
    { id: 'I-00095', player: 'Player_0095', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 1 },
    { id: 'I-00096', player: 'Player_0096', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 4 },
    { id: 'I-00097', player: 'Player_0097', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 7 },
    { id: 'I-00098', player: 'Player_0098', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 10 },
    { id: 'I-00099', player: 'Player_0099', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 13 },
    { id: 'I-00100', player: 'Player_0100', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 16 },
    { id: 'I-00101', player: 'Player_0101', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 19 },
    { id: 'I-00102', player: 'Player_0102', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 22 },
    { id: 'I-00103', player: 'Player_0103', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 25 },
    { id: 'I-00104', player: 'Player_0104', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 28 },
    { id: 'I-00105', player: 'Player_0105', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 31 },
    { id: 'I-00106', player: 'Player_0106', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 34 },
    { id: 'I-00107', player: 'Player_0107', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 37 },
    { id: 'I-00108', player: 'Player_0108', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 40 },
    { id: 'I-00109', player: 'Player_0109', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 43 },
    { id: 'I-00110', player: 'Player_0110', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 46 },
    { id: 'I-00111', player: 'Player_0111', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 49 },
    { id: 'I-00112', player: 'Player_0112', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 52 },
    { id: 'I-00113', player: 'Player_0113', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 55 },
    { id: 'I-00114', player: 'Player_0114', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 1 },
    { id: 'I-00115', player: 'Player_0115', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00116', player: 'Player_0116', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 7 },
    { id: 'I-00117', player: 'Player_0117', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 10 },
    { id: 'I-00118', player: 'Player_0118', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 13 },
    { id: 'I-00119', player: 'Player_0119', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 16 },
    { id: 'I-00120', player: 'Player_0120', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 19 },
    { id: 'I-00121', player: 'Player_0121', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 22 },
    { id: 'I-00122', player: 'Player_0122', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 25 },
    { id: 'I-00123', player: 'Player_0123', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 28 },
    { id: 'I-00124', player: 'Player_0124', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 31 },
    { id: 'I-00125', player: 'Player_0125', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 34 },
    { id: 'I-00126', player: 'Player_0126', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 37 },
    { id: 'I-00127', player: 'Player_0127', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 40 },
    { id: 'I-00128', player: 'Player_0128', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 43 },
    { id: 'I-00129', player: 'Player_0129', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 46 },
    { id: 'I-00130', player: 'Player_0130', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 49 },
    { id: 'I-00131', player: 'Player_0131', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 52 },
    { id: 'I-00132', player: 'Player_0132', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 55 },
    { id: 'I-00133', player: 'Player_0133', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 1 },
    { id: 'I-00134', player: 'Player_0134', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 4 },
    { id: 'I-00135', player: 'Player_0135', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 7 },
    { id: 'I-00136', player: 'Player_0136', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 10 },
    { id: 'I-00137', player: 'Player_0137', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 13 },
    { id: 'I-00138', player: 'Player_0138', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 16 },
    { id: 'I-00139', player: 'Player_0139', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 19 },
    { id: 'I-00140', player: 'Player_0140', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 22 },
    { id: 'I-00141', player: 'Player_0141', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 25 },
    { id: 'I-00142', player: 'Player_0142', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 28 },
    { id: 'I-00143', player: 'Player_0143', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 31 },
    { id: 'I-00144', player: 'Player_0144', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 34 },
    { id: 'I-00145', player: 'Player_0145', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 37 },
    { id: 'I-00146', player: 'Player_0146', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 40 },
    { id: 'I-00147', player: 'Player_0147', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 43 },
    { id: 'I-00148', player: 'Player_0148', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 46 },
    { id: 'I-00149', player: 'Player_0149', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 49 },
    { id: 'I-00150', player: 'Player_0150', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 52 },
    { id: 'I-00151', player: 'Player_0151', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 55 },
    { id: 'I-00152', player: 'Player_0152', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 1 },
    { id: 'I-00153', player: 'Player_0153', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00154', player: 'Player_0154', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 7 },
    { id: 'I-00155', player: 'Player_0155', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 10 },
    { id: 'I-00156', player: 'Player_0156', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 13 },
    { id: 'I-00157', player: 'Player_0157', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 16 },
    { id: 'I-00158', player: 'Player_0158', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 19 },
    { id: 'I-00159', player: 'Player_0159', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 22 },
    { id: 'I-00160', player: 'Player_0160', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 25 },
    { id: 'I-00161', player: 'Player_0161', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 28 },
    { id: 'I-00162', player: 'Player_0162', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 31 },
    { id: 'I-00163', player: 'Player_0163', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 34 },
    { id: 'I-00164', player: 'Player_0164', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 37 },
    { id: 'I-00165', player: 'Player_0165', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 40 },
    { id: 'I-00166', player: 'Player_0166', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 43 },
    { id: 'I-00167', player: 'Player_0167', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 46 },
    { id: 'I-00168', player: 'Player_0168', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 49 },
    { id: 'I-00169', player: 'Player_0169', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 52 },
    { id: 'I-00170', player: 'Player_0170', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 55 },
    { id: 'I-00171', player: 'Player_0171', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 1 },
    { id: 'I-00172', player: 'Player_0172', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 4 },
    { id: 'I-00173', player: 'Player_0173', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 7 },
    { id: 'I-00174', player: 'Player_0174', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 10 },
    { id: 'I-00175', player: 'Player_0175', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 13 },
    { id: 'I-00176', player: 'Player_0176', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 16 },
    { id: 'I-00177', player: 'Player_0177', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 19 },
    { id: 'I-00178', player: 'Player_0178', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 22 },
    { id: 'I-00179', player: 'Player_0179', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 25 },
    { id: 'I-00180', player: 'Player_0180', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 28 },
    { id: 'I-00181', player: 'Player_0181', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 31 },
    { id: 'I-00182', player: 'Player_0182', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 34 },
    { id: 'I-00183', player: 'Player_0183', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 37 },
    { id: 'I-00184', player: 'Player_0184', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 40 },
    { id: 'I-00185', player: 'Player_0185', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 43 },
    { id: 'I-00186', player: 'Player_0186', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 46 },
    { id: 'I-00187', player: 'Player_0187', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 49 },
    { id: 'I-00188', player: 'Player_0188', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 52 },
    { id: 'I-00189', player: 'Player_0189', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 55 },
    { id: 'I-00190', player: 'Player_0190', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 1 },
    { id: 'I-00191', player: 'Player_0191', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00192', player: 'Player_0192', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 7 },
    { id: 'I-00193', player: 'Player_0193', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 10 },
    { id: 'I-00194', player: 'Player_0194', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 13 },
    { id: 'I-00195', player: 'Player_0195', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 16 },
    { id: 'I-00196', player: 'Player_0196', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 19 },
    { id: 'I-00197', player: 'Player_0197', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 22 },
    { id: 'I-00198', player: 'Player_0198', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 25 },
    { id: 'I-00199', player: 'Player_0199', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 28 },
    { id: 'I-00200', player: 'Player_0200', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 31 },
    { id: 'I-00201', player: 'Player_0201', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 34 },
    { id: 'I-00202', player: 'Player_0202', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 37 },
    { id: 'I-00203', player: 'Player_0203', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 40 },
    { id: 'I-00204', player: 'Player_0204', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 43 },
    { id: 'I-00205', player: 'Player_0205', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 46 },
    { id: 'I-00206', player: 'Player_0206', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 49 },
    { id: 'I-00207', player: 'Player_0207', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 52 },
    { id: 'I-00208', player: 'Player_0208', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 55 },
    { id: 'I-00209', player: 'Player_0209', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 1 },
    { id: 'I-00210', player: 'Player_0210', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 4 },
    { id: 'I-00211', player: 'Player_0211', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 7 },
    { id: 'I-00212', player: 'Player_0212', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 10 },
    { id: 'I-00213', player: 'Player_0213', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 13 },
    { id: 'I-00214', player: 'Player_0214', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 16 },
    { id: 'I-00215', player: 'Player_0215', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 19 },
    { id: 'I-00216', player: 'Player_0216', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 22 },
    { id: 'I-00217', player: 'Player_0217', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 25 },
    { id: 'I-00218', player: 'Player_0218', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 28 },
    { id: 'I-00219', player: 'Player_0219', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 31 },
    { id: 'I-00220', player: 'Player_0220', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 34 },
    { id: 'I-00221', player: 'Player_0221', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 37 },
    { id: 'I-00222', player: 'Player_0222', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 40 },
    { id: 'I-00223', player: 'Player_0223', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 43 },
    { id: 'I-00224', player: 'Player_0224', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 46 },
    { id: 'I-00225', player: 'Player_0225', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 49 },
    { id: 'I-00226', player: 'Player_0226', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 52 },
    { id: 'I-00227', player: 'Player_0227', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 55 },
    { id: 'I-00228', player: 'Player_0228', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 1 },
    { id: 'I-00229', player: 'Player_0229', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00230', player: 'Player_0230', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 7 },
    { id: 'I-00231', player: 'Player_0231', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 10 },
    { id: 'I-00232', player: 'Player_0232', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 13 },
    { id: 'I-00233', player: 'Player_0233', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 16 },
    { id: 'I-00234', player: 'Player_0234', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 19 },
    { id: 'I-00235', player: 'Player_0235', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 22 },
    { id: 'I-00236', player: 'Player_0236', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 25 },
    { id: 'I-00237', player: 'Player_0237', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 28 },
    { id: 'I-00238', player: 'Player_0238', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 31 },
    { id: 'I-00239', player: 'Player_0239', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 34 },
    { id: 'I-00240', player: 'Player_0240', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 37 },
    { id: 'I-00241', player: 'Player_0241', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 40 },
    { id: 'I-00242', player: 'Player_0242', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 43 },
    { id: 'I-00243', player: 'Player_0243', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 46 },
    { id: 'I-00244', player: 'Player_0244', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 49 },
    { id: 'I-00245', player: 'Player_0245', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 52 },
    { id: 'I-00246', player: 'Player_0246', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 55 },
    { id: 'I-00247', player: 'Player_0247', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 1 },
    { id: 'I-00248', player: 'Player_0248', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 4 },
    { id: 'I-00249', player: 'Player_0249', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 7 },
    { id: 'I-00250', player: 'Player_0250', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 10 },
    { id: 'I-00251', player: 'Player_0251', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 13 },
    { id: 'I-00252', player: 'Player_0252', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 16 },
    { id: 'I-00253', player: 'Player_0253', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 19 },
    { id: 'I-00254', player: 'Player_0254', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 22 },
    { id: 'I-00255', player: 'Player_0255', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 25 },
    { id: 'I-00256', player: 'Player_0256', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 28 },
    { id: 'I-00257', player: 'Player_0257', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 31 },
    { id: 'I-00258', player: 'Player_0258', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 34 },
    { id: 'I-00259', player: 'Player_0259', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 37 },
    { id: 'I-00260', player: 'Player_0260', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 40 },
    { id: 'I-00261', player: 'Player_0261', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 43 },
    { id: 'I-00262', player: 'Player_0262', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 46 },
    { id: 'I-00263', player: 'Player_0263', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 49 },
    { id: 'I-00264', player: 'Player_0264', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 52 },
    { id: 'I-00265', player: 'Player_0265', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 55 },
    { id: 'I-00266', player: 'Player_0266', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 1 },
    { id: 'I-00267', player: 'Player_0267', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00268', player: 'Player_0268', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 7 },
    { id: 'I-00269', player: 'Player_0269', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 10 },
    { id: 'I-00270', player: 'Player_0270', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 13 },
    { id: 'I-00271', player: 'Player_0271', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 16 },
    { id: 'I-00272', player: 'Player_0272', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 19 },
    { id: 'I-00273', player: 'Player_0273', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 22 },
    { id: 'I-00274', player: 'Player_0274', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 25 },
    { id: 'I-00275', player: 'Player_0275', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 28 },
    { id: 'I-00276', player: 'Player_0276', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 31 },
    { id: 'I-00277', player: 'Player_0277', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 34 },
    { id: 'I-00278', player: 'Player_0278', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 37 },
    { id: 'I-00279', player: 'Player_0279', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 40 },
    { id: 'I-00280', player: 'Player_0280', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 43 },
    { id: 'I-00281', player: 'Player_0281', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 46 },
    { id: 'I-00282', player: 'Player_0282', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 49 },
    { id: 'I-00283', player: 'Player_0283', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 52 },
    { id: 'I-00284', player: 'Player_0284', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 55 },
    { id: 'I-00285', player: 'Player_0285', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 1 },
    { id: 'I-00286', player: 'Player_0286', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 4 },
    { id: 'I-00287', player: 'Player_0287', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 7 },
    { id: 'I-00288', player: 'Player_0288', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 10 },
    { id: 'I-00289', player: 'Player_0289', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 13 },
    { id: 'I-00290', player: 'Player_0290', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 16 },
    { id: 'I-00291', player: 'Player_0291', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 19 },
    { id: 'I-00292', player: 'Player_0292', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 22 },
    { id: 'I-00293', player: 'Player_0293', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 25 },
    { id: 'I-00294', player: 'Player_0294', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 28 },
    { id: 'I-00295', player: 'Player_0295', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 31 },
    { id: 'I-00296', player: 'Player_0296', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 34 },
    { id: 'I-00297', player: 'Player_0297', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 37 },
    { id: 'I-00298', player: 'Player_0298', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 40 },
    { id: 'I-00299', player: 'Player_0299', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 43 },
    { id: 'I-00300', player: 'Player_0300', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 46 },
    { id: 'I-00301', player: 'Player_0301', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 49 },
    { id: 'I-00302', player: 'Player_0302', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 52 },
    { id: 'I-00303', player: 'Player_0303', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 55 },
    { id: 'I-00304', player: 'Player_0304', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 1 },
    { id: 'I-00305', player: 'Player_0305', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00306', player: 'Player_0306', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 7 },
    { id: 'I-00307', player: 'Player_0307', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 10 },
    { id: 'I-00308', player: 'Player_0308', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 13 },
    { id: 'I-00309', player: 'Player_0309', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 16 },
    { id: 'I-00310', player: 'Player_0310', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 19 },
    { id: 'I-00311', player: 'Player_0311', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 22 },
    { id: 'I-00312', player: 'Player_0312', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 25 },
    { id: 'I-00313', player: 'Player_0313', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 28 },
    { id: 'I-00314', player: 'Player_0314', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 31 },
    { id: 'I-00315', player: 'Player_0315', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 34 },
    { id: 'I-00316', player: 'Player_0316', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 37 },
    { id: 'I-00317', player: 'Player_0317', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 40 },
    { id: 'I-00318', player: 'Player_0318', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 43 },
    { id: 'I-00319', player: 'Player_0319', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 46 },
    { id: 'I-00320', player: 'Player_0320', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 49 },
    { id: 'I-00321', player: 'Player_0321', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 52 },
    { id: 'I-00322', player: 'Player_0322', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 55 },
    { id: 'I-00323', player: 'Player_0323', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 1 },
    { id: 'I-00324', player: 'Player_0324', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 4 },
    { id: 'I-00325', player: 'Player_0325', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 7 },
    { id: 'I-00326', player: 'Player_0326', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 10 },
    { id: 'I-00327', player: 'Player_0327', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 13 },
    { id: 'I-00328', player: 'Player_0328', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 16 },
    { id: 'I-00329', player: 'Player_0329', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 19 },
    { id: 'I-00330', player: 'Player_0330', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 22 },
    { id: 'I-00331', player: 'Player_0331', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 25 },
    { id: 'I-00332', player: 'Player_0332', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 28 },
    { id: 'I-00333', player: 'Player_0333', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 31 },
    { id: 'I-00334', player: 'Player_0334', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 34 },
    { id: 'I-00335', player: 'Player_0335', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 37 },
    { id: 'I-00336', player: 'Player_0336', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 40 },
    { id: 'I-00337', player: 'Player_0337', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 43 },
    { id: 'I-00338', player: 'Player_0338', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 46 },
    { id: 'I-00339', player: 'Player_0339', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 49 },
    { id: 'I-00340', player: 'Player_0340', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 52 },
    { id: 'I-00341', player: 'Player_0341', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 55 },
    { id: 'I-00342', player: 'Player_0342', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 1 },
    { id: 'I-00343', player: 'Player_0343', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00344', player: 'Player_0344', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 7 },
    { id: 'I-00345', player: 'Player_0345', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 10 },
    { id: 'I-00346', player: 'Player_0346', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 13 },
    { id: 'I-00347', player: 'Player_0347', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 16 },
    { id: 'I-00348', player: 'Player_0348', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 19 },
    { id: 'I-00349', player: 'Player_0349', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 22 },
    { id: 'I-00350', player: 'Player_0350', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 25 },
    { id: 'I-00351', player: 'Player_0351', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 28 },
    { id: 'I-00352', player: 'Player_0352', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 31 },
    { id: 'I-00353', player: 'Player_0353', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 34 },
    { id: 'I-00354', player: 'Player_0354', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 37 },
    { id: 'I-00355', player: 'Player_0355', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 40 },
    { id: 'I-00356', player: 'Player_0356', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 43 },
    { id: 'I-00357', player: 'Player_0357', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 46 },
    { id: 'I-00358', player: 'Player_0358', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 49 },
    { id: 'I-00359', player: 'Player_0359', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 52 },
    { id: 'I-00360', player: 'Player_0360', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 55 },
    { id: 'I-00361', player: 'Player_0361', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 1 },
    { id: 'I-00362', player: 'Player_0362', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 4 },
    { id: 'I-00363', player: 'Player_0363', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 7 },
    { id: 'I-00364', player: 'Player_0364', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 10 },
    { id: 'I-00365', player: 'Player_0365', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 13 },
    { id: 'I-00366', player: 'Player_0366', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 16 },
    { id: 'I-00367', player: 'Player_0367', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 19 },
    { id: 'I-00368', player: 'Player_0368', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 22 },
    { id: 'I-00369', player: 'Player_0369', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 25 },
    { id: 'I-00370', player: 'Player_0370', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 28 },
    { id: 'I-00371', player: 'Player_0371', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 31 },
    { id: 'I-00372', player: 'Player_0372', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 34 },
    { id: 'I-00373', player: 'Player_0373', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 37 },
    { id: 'I-00374', player: 'Player_0374', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 40 },
    { id: 'I-00375', player: 'Player_0375', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 43 },
    { id: 'I-00376', player: 'Player_0376', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 46 },
    { id: 'I-00377', player: 'Player_0377', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 49 },
    { id: 'I-00378', player: 'Player_0378', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 52 },
    { id: 'I-00379', player: 'Player_0379', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 55 },
    { id: 'I-00380', player: 'Player_0380', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 1 },
    { id: 'I-00381', player: 'Player_0381', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00382', player: 'Player_0382', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 7 },
    { id: 'I-00383', player: 'Player_0383', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 10 },
    { id: 'I-00384', player: 'Player_0384', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 13 },
    { id: 'I-00385', player: 'Player_0385', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 16 },
    { id: 'I-00386', player: 'Player_0386', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 19 },
    { id: 'I-00387', player: 'Player_0387', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 22 },
    { id: 'I-00388', player: 'Player_0388', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 25 },
    { id: 'I-00389', player: 'Player_0389', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 28 },
    { id: 'I-00390', player: 'Player_0390', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 31 },
    { id: 'I-00391', player: 'Player_0391', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 34 },
    { id: 'I-00392', player: 'Player_0392', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 37 },
    { id: 'I-00393', player: 'Player_0393', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 40 },
    { id: 'I-00394', player: 'Player_0394', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 43 },
    { id: 'I-00395', player: 'Player_0395', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 46 },
    { id: 'I-00396', player: 'Player_0396', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 49 },
    { id: 'I-00397', player: 'Player_0397', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 52 },
    { id: 'I-00398', player: 'Player_0398', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 55 },
    { id: 'I-00399', player: 'Player_0399', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 1 },
    { id: 'I-00400', player: 'Player_0400', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 4 },
    { id: 'I-00401', player: 'Player_0401', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 7 },
    { id: 'I-00402', player: 'Player_0402', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 10 },
    { id: 'I-00403', player: 'Player_0403', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 13 },
    { id: 'I-00404', player: 'Player_0404', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 16 },
    { id: 'I-00405', player: 'Player_0405', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 19 },
    { id: 'I-00406', player: 'Player_0406', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 22 },
    { id: 'I-00407', player: 'Player_0407', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 25 },
    { id: 'I-00408', player: 'Player_0408', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 28 },
    { id: 'I-00409', player: 'Player_0409', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 31 },
    { id: 'I-00410', player: 'Player_0410', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 34 },
    { id: 'I-00411', player: 'Player_0411', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 37 },
    { id: 'I-00412', player: 'Player_0412', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 40 },
    { id: 'I-00413', player: 'Player_0413', type: 'Remote Abuse', server: '#K118N', status: 'Flagged', minuteOffset: 43 },
    { id: 'I-00414', player: 'Player_0414', type: 'Rate Abuse', server: '#D091V', status: 'Banned', minuteOffset: 46 },
    { id: 'I-00415', player: 'Player_0415', type: 'Inventory Spoof', server: '#R220L', status: 'Flagged', minuteOffset: 49 },
    { id: 'I-00416', player: 'Player_0416', type: 'Speed Spike', server: '#A145X', status: 'Banned', minuteOffset: 52 },
    { id: 'I-00417', player: 'Player_0417', type: 'Fly Pattern', server: '#F712C', status: 'Flagged', minuteOffset: 55 },
    { id: 'I-00418', player: 'Player_0418', type: 'Teleport Burst', server: '#Q333K', status: 'Banned', minuteOffset: 1 },
    { id: 'I-00419', player: 'Player_0419', type: 'Noclip Vector', server: '#M882D', status: 'Flagged', minuteOffset: 4 },
    { id: 'I-00420', player: 'Player_0420', type: 'Aimbot Curve', server: '#P401B', status: 'Banned', minuteOffset: 7 },
];

function readStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        return null;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        return;
    }
}

function removeStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        return;
    }
}

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return Array.from(document.querySelectorAll(selector));
}

var detectionRowCache = [];
var detectionFilterFrame = 0;
var ruleCatalogPageSize = 60;
var ruleCatalogVisibleCount = 60;

function debounce(fn, wait) {
    var timeout = null;
    var delay = typeof wait === "number" ? wait : 140;
    return function () {
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            fn.apply(null, args);
        }, delay);
    };
}

function runWhenIdle(callback, timeout) {
    if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(callback, { timeout: typeof timeout === "number" ? timeout : 1200 });
        return;
    }
    setTimeout(callback, 36);
}

function paginateElementChildren(container, pageSize, options) {
    if (!container || !pageSize) return;
    var items = [];
    if (options && options.itemSelector) {
        items = Array.from(container.querySelectorAll(options.itemSelector));
    } else {
        items = Array.from(container.children);
    }
    if (items.length <= pageSize) return;

    var state = {
        total: items.length,
        visible: Math.min(pageSize, items.length),
        step: Math.max(1, pageSize)
    };

    items.forEach(function (item, index) {
        item.hidden = index >= state.visible;
    });

    var pager = document.createElement("div");
    pager.className = "collection-pager";

    var counter = document.createElement("span");
    counter.className = "muted";
    pager.appendChild(counter);

    var controls = document.createElement("div");
    controls.className = "collection-pager-controls";
    pager.appendChild(controls);

    var showMoreBtn = document.createElement("button");
    showMoreBtn.type = "button";
    showMoreBtn.className = "btn btn-ghost pager-btn";
    showMoreBtn.textContent = (options && options.moreLabel) ? options.moreLabel : "Show More";
    controls.appendChild(showMoreBtn);

    var showLessBtn = document.createElement("button");
    showLessBtn.type = "button";
    showLessBtn.className = "btn btn-ghost pager-btn";
    showLessBtn.textContent = (options && options.lessLabel) ? options.lessLabel : "Show Less";
    controls.appendChild(showLessBtn);

    function sync() {
        counter.textContent = state.visible + " / " + state.total + " visible";
        showMoreBtn.disabled = state.visible >= state.total;
        showLessBtn.disabled = state.visible <= state.step;
    }

    showMoreBtn.addEventListener("click", function () {
        var nextVisible = Math.min(state.total, state.visible + state.step);
        for (var i = state.visible; i < nextVisible; i += 1) {
            items[i].hidden = false;
        }
        state.visible = nextVisible;
        sync();
    });

    showLessBtn.addEventListener("click", function () {
        var nextVisible = Math.max(state.step, state.visible - state.step);
        for (var i = nextVisible; i < state.total; i += 1) {
            items[i].hidden = true;
        }
        state.visible = nextVisible;
        sync();
    });

    var insertionTarget = container;
    if (container.tagName === "TBODY") {
        var table = container.closest("table");
        insertionTarget = table || container;
    }
    insertionTarget.insertAdjacentElement("afterend", pager);
    sync();
}

function paginateTableBody(tableBody, pageSize) {
    if (!tableBody) return;
    paginateElementChildren(tableBody, pageSize, {
        itemSelector: "tr",
        moreLabel: "Show More Rows",
        lessLabel: "Show Fewer Rows"
    });
}

function initProgressiveCollections() {
    paginateElementChildren(qs(".feature-grid"), 12);
    paginateElementChildren(qs(".integration-grid"), 18);
    paginateElementChildren(qs(".timeline-grid"), 12);
    paginateElementChildren(qs(".resource-grid"), 16);
    paginateElementChildren(qs(".status-feed"), 20);
    paginateElementChildren(qs(".faq-long"), 24);

    var faqSection = qs("#faq");
    if (faqSection) {
        paginateElementChildren(faqSection, 24, {
            itemSelector: ".faq-item",
            moreLabel: "More FAQ",
            lessLabel: "Fewer FAQ"
        });
    }
}

function initLargeTablePagination() {
    qsa("table tbody").forEach(function (tableBody) {
        if (!(tableBody instanceof HTMLTableSectionElement)) return;
        if (tableBody.id === "detections-body") return;
        if (tableBody.id === "rule-catalog-body") return;
        paginateTableBody(tableBody, 40);
    });
}

function getSelectedPlan() {
    return readStorage(STORAGE_KEYS.plan) || "Starter";
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    writeStorage(STORAGE_KEYS.theme, theme);
}

function initThemeToggle() {
    var saved = readStorage(STORAGE_KEYS.theme);
    if (saved === "light" || saved === "dark") {
        setTheme(saved);
    }
    var button = qs("#theme-toggle-btn");
    if (!button) return;
    button.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
        setTheme(current === "light" ? "dark" : "light");
    });
}

function initFAQ() {
    document.addEventListener("click", function (event) {
        var target = event.target;
        if (!(target instanceof Element)) return;
        var question = target.closest(".faq-question");
        if (!question) return;
        var item = question.closest(".faq-item");
        if (!item) return;
        var answer = item.querySelector(".faq-answer");
        if (!answer) return;
        answer.style.maxHeight = answer.style.maxHeight ? "" : answer.scrollHeight + "px";
    });
}

function initHeroIconAnimation() {
    var outer = qs(".outer");
    var inner = qs(".inner");
    var icon = qs(".hero-icon");
    if (!outer || !inner || !icon) return;

    var outerLen = outer.getTotalLength();
    var innerLen = inner.getTotalLength();
    outer.style.strokeDasharray = outerLen;
    outer.style.strokeDashoffset = outerLen;
    inner.style.strokeDasharray = innerLen;
    inner.style.strokeDashoffset = innerLen;

    function ease(x) { return 1 - Math.pow(1 - x, 3); }
    var start = null;
    var duration = 1800;

    function runGlint() {
        var glint = document.createElement("div");
        glint.className = "glint";
        icon.appendChild(glint);
        requestAnimationFrame(function () { glint.style.left = "140%"; });
        setTimeout(function () { glint.remove(); }, 1200);
    }

    function scheduleGlint() {
        var delay = 4000 + Math.random() * 3000;
        setTimeout(function () {
            runGlint();
            scheduleGlint();
        }, delay);
    }

    function tick(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = ease(progress);
        outer.style.strokeDashoffset = outerLen * (1 - eased);
        if (progress > 0.42) {
            var innerProgress = (progress - 0.42) / 0.58;
            inner.style.strokeDashoffset = innerLen * (1 - ease(innerProgress));
        }
        icon.style.transform = "rotate(" + ((1 - eased) * -0.22) + "rad)";
        if (progress < 1) requestAnimationFrame(tick); else scheduleGlint();
    }

    requestAnimationFrame(tick);
}

function initMobileNav() {
    var toggle = qs(".mobile-toggle");
    var navLinks = qs(".nav-links");
    if (!toggle || !navLinks) return;
    toggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
    qsa(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () { navLinks.classList.remove("active"); });
    });
}

function initBackToTop() {
    var button = qs("#back-to-top");
    if (!button) return;
    function sync() {
        if (window.scrollY > 520) button.classList.add("show"); else button.classList.remove("show");
    }
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    button.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initPlanSelection() {
    qsa(".choose-plan-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            var plan = button.getAttribute("data-plan");
            if (!plan) return;
            writeStorage(STORAGE_KEYS.plan, plan);
        });
    });
}

function initScrollAnimations() {
    if (typeof IntersectionObserver === "undefined") return;
    var elements = qsa("section h2, .card, .hero > *, .faq-item");
    if (!elements.length) return;

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach(function (element) {
            element.classList.add("reveal");
            element.classList.add("active");
        });
        return;
    }

    var maxObserved = 280;
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    elements.forEach(function (element, index) {
        element.classList.add("reveal");
        if (index < maxObserved) {
            observer.observe(element);
            return;
        }
        element.classList.add("active");
    });
}

function ensureRuleSearchUi() {
    var tableContainer = qs("#catalog .table-container");
    if (!tableContainer) return null;
    var existing = qs("#rule-search");
    if (existing) return existing;
    var wrapper = document.createElement("div");
    wrapper.className = "rule-search-wrap";
    wrapper.style.display = "grid";
    wrapper.style.gap = "0.6rem";
    wrapper.style.marginTop = "0.8rem";
    wrapper.innerHTML = "<input id=\"rule-search\" class=\"form-input\" placeholder=\"Search by id, name, category, action\"><div class=\"rule-search-actions\"><div id=\"rule-search-count\" class=\"muted\"></div><button id=\"rule-load-more\" type=\"button\" class=\"btn btn-ghost pager-btn\">Load More Rules</button></div>";
    tableContainer.parentElement.insertBefore(wrapper, tableContainer);
    return qs("#rule-search");
}

function filterRuleCatalog(query) {
    var normalized = query.trim().toLowerCase();
    var rows = qsa("#rule-catalog-body tr");
    var matchedRows = [];
    var visible = 0;
    rows.forEach(function (row) {
        var text = (row.textContent || "").toLowerCase();
        var match = !normalized || text.indexOf(normalized) !== -1;
        if (!match) {
            row.style.display = "none";
            return;
        }

        matchedRows.push(row);
        var shouldHideForPage = !normalized && matchedRows.length > ruleCatalogVisibleCount;
        row.style.display = shouldHideForPage ? "none" : "";
        if (!shouldHideForPage) visible += 1;
    });

    var count = qs("#rule-search-count");
    if (count) {
        count.textContent = visible + " visible of " + matchedRows.length + " matching rows";
    }

    var loadMoreButton = qs("#rule-load-more");
    if (loadMoreButton) {
        var canLoadMore = !normalized && matchedRows.length > ruleCatalogVisibleCount;
        loadMoreButton.hidden = !canLoadMore;
    }
}

function initRuleCatalogSearch() {
    var input = ensureRuleSearchUi();
    if (!(input instanceof HTMLInputElement)) return;

    var loadMoreButton = qs("#rule-load-more");
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", function () {
            ruleCatalogVisibleCount += ruleCatalogPageSize;
            filterRuleCatalog(input.value);
        });
    }

    input.addEventListener("input", debounce(function () {
        if (!input.value.trim()) {
            ruleCatalogVisibleCount = ruleCatalogPageSize;
        }
        filterRuleCatalog(input.value);
    }, 120));

    filterRuleCatalog("");
}

function initLoginPage() {
    var form = qs("#login-form");
    if (!form) return;
    var planLabel = qs("#selected-plan");
    if (planLabel) planLabel.textContent = "Selected plan: " + getSelectedPlan();

    var emailInput = qs("#email");
    var passwordInput = qs("#password");
    var rememberInput = qs("#remember-me");
    var remembered = readStorage(STORAGE_KEYS.rememberedEmail);
    if (remembered && emailInput instanceof HTMLInputElement) {
        emailInput.value = remembered;
        if (rememberInput instanceof HTMLInputElement) rememberInput.checked = true;
    }

    var demoButton = qs("#demo-fill-btn");
    if (demoButton) {
        demoButton.addEventListener("click", function () {
            if (emailInput instanceof HTMLInputElement) emailInput.value = "admin@radon.gg";
            if (passwordInput instanceof HTMLInputElement) passwordInput.value = "radon-demo-pass";
        });
    }

    var togglePasswordButton = qs("#toggle-password-btn");
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener("click", function () {
            if (!(passwordInput instanceof HTMLInputElement)) return;
            var nextType = passwordInput.type === "password" ? "text" : "password";
            passwordInput.type = nextType;
            togglePasswordButton.textContent = nextType === "password" ? "Show" : "Hide";
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var email = emailInput instanceof HTMLInputElement ? emailInput.value.trim() : "";
        var password = passwordInput instanceof HTMLInputElement ? passwordInput.value : "";
        if (!email || !password) return;

        if (rememberInput instanceof HTMLInputElement && rememberInput.checked) {
            writeStorage(STORAGE_KEYS.rememberedEmail, email);
        } else {
            removeStorage(STORAGE_KEYS.rememberedEmail);
        }

        writeStorage(STORAGE_KEYS.auth, JSON.stringify({
            email: email,
            loggedInAt: new Date().toISOString(),
            plan: getSelectedPlan()
        }));

        window.location.href = "dashboard.html";
    });
}

function createToast(message) {
    var wrap = qs(".toast-wrap");
    if (!wrap) {
        wrap = document.createElement("div");
        wrap.className = "toast-wrap";
        document.body.appendChild(wrap);
    }
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    wrap.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 2200);
}

function exportRowsToCsv(rows, fileName) {
    var header = ["Player", "Detection Type", "Server ID", "Time", "Status"];
    var lines = [header.join(",")];
    rows.forEach(function (row) {
        var cols = Array.from(row.querySelectorAll("td")).map(function (cell) {
            var val = (cell.textContent || "").trim().replace(/"/g, "\"\"");
            return "\"" + val + "\"";
        });
        lines.push(cols.join(","));
    });
    var csv = lines.join("\n");
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function getDetectionRows() {
    return qsa("#detections-body tr");
}

function recacheDetectionRows() {
    detectionRowCache = getDetectionRows().map(function (row) {
        var statusNode = row.querySelector("td:last-child");
        return {
            row: row,
            text: (row.textContent || "").toLowerCase(),
            status: statusNode ? (statusNode.textContent || "").toLowerCase() : ""
        };
    });
}

function filterDetections() {
    var searchInput = qs("#detection-search");
    var statusFilter = qs("#status-filter");
    var query = searchInput instanceof HTMLInputElement ? searchInput.value.trim().toLowerCase() : "";
    var status = statusFilter instanceof HTMLSelectElement ? statusFilter.value : "all";
    if (!detectionRowCache.length) {
        recacheDetectionRows();
    }

    detectionRowCache.forEach(function (entry) {
        var matchQuery = !query || entry.text.indexOf(query) !== -1;
        var matchStatus = status === "all" || entry.status.indexOf(status) !== -1;
        entry.row.style.display = matchQuery && matchStatus ? "" : "none";
    });
}

function buildDetectionRow(incident) {
    var row = document.createElement("tr");
    var cls = incident.status === "Banned" ? "status-banned" : "status-warning";
    row.innerHTML =
        "<td>" + incident.player + "</td>" +
        "<td>" + incident.type + "</td>" +
        "<td>" + incident.server + "</td>" +
        "<td class=\"muted\">" + incident.minuteOffset + " mins ago</td>" +
        "<td><span class=\"status-badge " + cls + "\">" + incident.status + "</span></td>";
    return row;
}

function addSimulatedDetection() {
    var body = qs("#detections-body");
    if (!body) return;
    var incident = INCIDENT_LIBRARY[Math.floor(Math.random() * INCIDENT_LIBRARY.length)];
    var row = buildDetectionRow(incident);
    body.prepend(row);
    recacheDetectionRows();
}

function scheduleDetectionFilter() {
    if (detectionFilterFrame) {
        cancelAnimationFrame(detectionFilterFrame);
    }
    detectionFilterFrame = requestAnimationFrame(function () {
        detectionFilterFrame = 0;
        filterDetections();
    });
}

function initDashboardSidebar() {
    var toggle = qs(".menu-toggle");
    var sidebar = qs(".sidebar");
    if (!toggle || !sidebar) return;
    toggle.addEventListener("click", function () {
        sidebar.classList.toggle("open");
    });
    document.addEventListener("click", function (event) {
        var target = event.target;
        if (!(target instanceof Element)) return;
        if (window.innerWidth <= 1024 && sidebar.classList.contains("open") && !sidebar.contains(target) && !toggle.contains(target)) {
            sidebar.classList.remove("open");
        }
    });
}

function initDashboardEnhancements() {
    var exportButton = qs("#export-csv-btn");
    if (exportButton) {
        exportButton.addEventListener("click", function (event) {
            event.preventDefault();
            exportRowsToCsv(getDetectionRows(), "radon-detections.csv");
            createToast("Exported current detections to CSV.");
        });
    }

    var simulateButton = qs("#simulate-detection-btn");
    if (simulateButton) {
        simulateButton.addEventListener("click", function () {
            addSimulatedDetection();
            filterDetections();
            createToast("Simulated detection inserted.");
        });
    }

    var searchInput = qs("#detection-search");
    var statusFilter = qs("#status-filter");
    recacheDetectionRows();
    if (searchInput instanceof HTMLInputElement) searchInput.addEventListener("input", debounce(scheduleDetectionFilter, 90));
    if (statusFilter instanceof HTMLSelectElement) statusFilter.addEventListener("change", scheduleDetectionFilter);

    document.addEventListener("keydown", function (event) {
        var key = event.key ? event.key.toLowerCase() : "";
        if ((event.ctrlKey || event.metaKey) && key === "e") {
            event.preventDefault();
            exportRowsToCsv(getDetectionRows(), "radon-detections.csv");
            createToast("Shortcut: detection CSV exported.");
        }
        if ((event.ctrlKey || event.metaKey) && key === "k") {
            event.preventDefault();
            addSimulatedDetection();
            filterDetections();
            createToast("Shortcut: simulated incident created.");
        }
    });
}

function initDashboardPage() {
    var layout = qs(".dashboard-layout");
    if (!layout) return;
    var authRaw = readStorage(STORAGE_KEYS.auth);
    if (!authRaw) {
        window.location.href = "login.html";
        return;
    }

    var auth = null;
    try {
        auth = JSON.parse(authRaw);
    } catch (error) {
        auth = null;
    }

    if (!auth || !auth.email) {
        removeStorage(STORAGE_KEYS.auth);
        window.location.href = "login.html";
        return;
    }

    var emailTarget = qs("#dashboard-user-email");
    if (emailTarget) emailTarget.textContent = auth.email;
    var planTarget = qs("#dashboard-plan-name");
    if (planTarget) planTarget.textContent = getSelectedPlan();

    var logout = qs("#logout-link");
    if (logout) {
        logout.addEventListener("click", function () {
            removeStorage(STORAGE_KEYS.auth);
        });
    }

    initDashboardEnhancements();
    initDashboardSidebar();
}

function initPageEnhancements() {
    initThemeToggle();
    initMobileNav();
    initFAQ();
    initPlanSelection();
    initLoginPage();
    initDashboardPage();

    runWhenIdle(function () {
        initHeroIconAnimation();
        initBackToTop();
    }, 600);

    runWhenIdle(function () {
        initProgressiveCollections();
        initLargeTablePagination();
    }, 900);

    runWhenIdle(function () {
        initScrollAnimations();
        initRuleCatalogSearch();
    }, 1200);
}

document.addEventListener("DOMContentLoaded", initPageEnhancements);
