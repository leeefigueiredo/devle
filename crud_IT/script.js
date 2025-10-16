// script.js

document.addEventListener('DOMContentLoaded', () => {

    // ===== LÓGICA DE LOGIN =====
    const loginOverlay = document.getElementById('login-overlay');
    const loginForm = document.getElementById('login-form');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginError = document.getElementById('login-error');

    // Credenciais válidas
    const validEmails = ["guilherme.jeronymo@geomembrana.com.br", "leandro.oliveira@geomembrana.com.br"];
    const validPassword = "Souza@1112";

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio do formulário

        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value.trim();

        // Validação
        if (validEmails.includes(email) && password === validPassword) {
            // Se o login for bem-sucedido, esconde o pop-up
            loginOverlay.classList.add('hidden');
            loginError.textContent = ''; // Limpa mensagens de erro
        } else {
            // Se falhar, mostra uma mensagem de erro
            loginError.textContent = 'Email ou senha incorretos. Tente novamente.';
        }
    });


    // ===== O RESTANTE DO SEU CÓDIGO DE CHAMADOS CONTINUA ABAIXO =====
    // Ele será executado, mas a interface só será acessível após o login.
    
    // Elementos do Formulário
    const chamadoForm = document.getElementById('chamado-form');
    // ... (todo o resto do seu código JavaScript anterior continua aqui sem alterações)
    const editIndexInput = document.getElementById('edit-index');
    const chamadosTableBody = document.getElementById('chamados-table-body');
    const filterDate = document.getElementById('filter-date');
    const filterStatus = document.getElementById('filter-status');
    const hideCompletedCheckbox = document.getElementById('hide-completed');
    const clearFiltersBtn = document.getElementById('clear-filters');

    let chamados = JSON.parse(localStorage.getItem('chamadosTI')) || [];

    const saveChamados = () => {
        localStorage.setItem('chamadosTI', JSON.stringify(chamados));
    };

    const renderTable = () => {
        // ... (função renderTable completa de antes)
        chamadosTableBody.innerHTML = '';
        const dateValue = filterDate.value;
        const statusValue = filterStatus.value;
        const hideCompleted = hideCompletedCheckbox.checked;

        let chamadosFiltrados = chamados.filter(chamado => {
            const matchDate = !dateValue || chamado.dataAbertura === dateValue;
            const matchStatus = statusValue === 'Todos' || chamado.status === statusValue;
            const matchCompleted = !hideCompleted || chamado.status !== 'Concluído';
            return matchDate && matchStatus && matchCompleted;
        });
        
        if (chamadosFiltrados.length === 0) {
            chamadosTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Nenhum chamado corresponde aos filtros.</td></tr>`;
            return;
        }

        chamadosFiltrados.forEach((chamado) => {
            const originalIndex = chamados.findIndex(c => c === chamado);
            const dataAberturaFormatada = new Date(chamado.dataAbertura).toLocaleString('pt-BR', {timeZone: 'UTC'});
            const statusClass = `status-${chamado.status.replace(' ', '-')}`;
            const prioridadeClass = `prioridade-${chamado.prioridade}`;
            const row = `
                <tr>
                    <td>${chamado.titulo}</td>
                    <td>${chamado.responsavel}</td>
                    <td><span class="badge ${prioridadeClass}">${chamado.prioridade}</span></td>
                    <td><span class="badge ${statusClass}">${chamado.status}</span></td>
                    <td>${dataAberturaFormatada}</td>
                    <td>
                        <button class="action-btn btn-edit" onclick="editChamado(${originalIndex})">Editar</button>
                        <button class="action-btn btn-delete" onclick="deleteChamado(${originalIndex})">Excluir</button>
                    </td>
                </tr>
            `;
            chamadosTableBody.innerHTML += row;
        });
    };

    // ... (todas as outras funções: chamadoForm.addEventListener, window.editChamado, etc.)
    chamadoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const chamadoData = {
            titulo: document.getElementById('titulo').value,
            solicitante: document.getElementById('solicitante').value,
            departamento: document.getElementById('departamento').value,
            responsavel: document.getElementById('responsavel').value,
            prioridade: document.getElementById('prioridade').value,
            descricao: document.getElementById('descricao').value,
            status: document.getElementById('chamado-form').querySelector('#status') ? document.getElementById('status').value : 'Aberto'
        };
        const editIndex = editIndexInput.value;
        if (editIndex !== "") {
            chamadoData.dataAbertura = chamados[editIndex].dataAbertura;
            chamadoData.status = document.getElementById('status').value;
            chamados[editIndex] = chamadoData;
        } else {
            chamadoData.dataAbertura = new Date().toISOString().split('T')[0];
            chamadoData.status = 'Aberto';
            chamados.push(chamadoData);
        }
        saveChamados();
        renderTable();
        chamadoForm.reset();
        editIndexInput.value = "";
    });

    window.editChamado = (index) => {
        const chamado = chamados[index];
        document.getElementById('titulo').value = chamado.titulo;
        document.getElementById('solicitante').value = chamado.solicitante;
        document.getElementById('departamento').value = chamado.departamento;
        document.getElementById('responsavel').value = chamado.responsavel;
        document.getElementById('prioridade').value = chamado.prioridade;
        document.getElementById('descricao').value = chamado.descricao;
        if (!document.getElementById('status')) {
            const statusSelect = `
                <div class="form-group" id="status-group">
                    <label for="status">Status</label>
                    <select id="status">
                        <option value="Aberto">Aberto</option>
                        <option value="Em Andamento">Em Andamento</option>
                        <option value="Concluído">Concluído</option>
                    </select>
                </div>
            `;
            document.getElementById('responsavel').parentElement.insertAdjacentHTML('afterend', statusSelect);
        }
        document.getElementById('status').value = chamado.status;
        editIndexInput.value = index;
    };

    window.deleteChamado = (index) => {
        if (confirm(`Tem certeza que deseja excluir o chamado "${chamados[index].titulo}"?`)) {
            chamados.splice(index, 1);
            saveChamados();
            renderTable();
        }
    };

    filterDate.addEventListener('input', renderTable);
    filterStatus.addEventListener('change', renderTable);
    hideCompletedCheckbox.addEventListener('change', renderTable);

    clearFiltersBtn.addEventListener('click', () => {
        filterDate.value = '';
        filterStatus.value = 'Todos';
        hideCompletedCheckbox.checked = false;
        renderTable();
    });

    renderTable();
});